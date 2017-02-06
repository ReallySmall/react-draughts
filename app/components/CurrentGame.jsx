import React, { Component, PropTypes } from 'react';
import { map } from 'underscore';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';

const cx = classNames.bind(styles);

export default class CurrentGame extends Component {

  render(){

  	const { activePlayer, players, history } = this.props;

    return (
    	<aside>
            <h2>Current Game</h2>
            <div className={cx('scroll-wrapper')}>
	            <ul className={cx('plain')}>
	            	{map(history, function(gameEvent, i){
	            		return (
	            			<li key={i}>{gameEvent}</li>
	            		)
	            	})}
	            </ul>
            </div>
            <h3>Current player</h3>
            <p>{players[activePlayer]}</p>
        </aside>
    );
  }

}
