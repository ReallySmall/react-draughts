import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_piece';

const cx = classNames.bind(styles);

export default class InactivePiece extends Component {

  render(){

  	const { colour, player, type } = this.props;
  	const accessibleInfo = <span className={cx('visually-hidden')}>Player {player} {type}</span>;

    return (
      <p className={cx('piece', 'plain', colour, type)}>{accessibleInfo}</p>
    );
    
  }

}
