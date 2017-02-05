import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_square';

const cx = classNames.bind(styles);

export default class Square extends Component {

  render(){

    const { row, col, cellRef, gridSize, player, type, inGame, style } = this.props;
    const conditionalStyles = inGame === true ? 'alt ' : '';
    
    return ( 
      <div style={style} className={cx('square', conditionalStyles)}>
        {this.props.children}
      </div>
    );
  }

}
