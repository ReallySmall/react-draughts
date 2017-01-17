import React, { Component, PropTypes } from 'react';
import Piece from 'components/piece';
import classNames from 'classnames/bind';
import styles from 'css/components/_square';

const cx = classNames.bind(styles);

export default class Square extends Component {

  render(){

    const { row, col, cellRef, player, type, inGame } = this.props;
    const conditionalStyles = inGame === true ? 'alt ' : '';
    
    return ( 
    <div className={cx('square', conditionalStyles)}>
      {this.props.children}
    </div>
    );
  }

}
