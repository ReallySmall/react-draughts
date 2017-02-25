import React, { Component, PropTypes } from 'react';
import { map } from 'underscore';
import classNames from 'classnames/bind';
import styles from 'css/components/_current-game';

const cx = classNames.bind(styles);

export default class CurrentGame extends Component {

  render(){

  	const { activePlayer, players, history, finished, endGame } = this.props;

    return (
    	<aside>
        <h2>Current Game</h2>
        {finished && <form className={cx('form')}>
          <div className={cx('form-control')}>
            <button onClick={
              (event) => {
                event.preventDefault();
                endGame();
              } 
            }>Play again</button>
          </div>
        </form>}
        <div className={cx('scroll-wrapper')}>
          <ul className={cx('game-history')}>
          	{map(history, function(gameEvent, i){
              
              const { message, player } = gameEvent;
              const itemClass = player + 1 || '';

              return (
          			<li key={i} className={cx('player' + itemClass)}>
                  <span>{message}</span>
                </li>
          		)

          	})}
          </ul>
        </div>
      </aside>
    );
  }

}
