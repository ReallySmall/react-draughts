import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_piece';

const cx = classNames.bind(styles);

export default class Piece extends Component {

  render(){

  	const { cellRef, player, type, activePlayer } = this.props;
    const colours = ['', 'red', 'green'];
  	const colour = colours[player];
  	const accessibleInfo = <span className={cx('visually-hidden')}>Player {player} {type}</span>;
  	const isActive = player === activePlayer ? true: false;

    return (
    	<div>
	  		{player && isActive && <button className={cx('piece', 'moveable', colour)}>{accessibleInfo}</button>}
	  		{player && !isActive && <p className={cx('piece', 'plain', colour)}>{accessibleInfo}</p>}
        {!player && <button className={cx('piece','available', 'plain')}></button>}
  		</div>
    );
  }

}
