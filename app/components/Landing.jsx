import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_piece';

const cx = classNames.bind(styles);

export default class Landing extends Component {

  render(){

    const { cellRef, moveActivePieceToHere } = this.props;

    return (
      <button className={cx('piece','landing', 'plain')}
  	    onClick={
          (event) => {
            event.preventDefault();
            moveActivePieceToHere(cellRef);
          }}>
          <span className={cx('visually-hidden')}>Move selected piece to here</span>
      </button>
    );

  }

}
