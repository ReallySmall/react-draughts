import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_piece';

const cx = classNames.bind(styles);

export default class ActivePiece extends Component {

  render(){

  	const { colour, cellRef, player, type, selected, setPieceSelection } = this.props;
  	const accessibleInfo = <span className={cx('visually-hidden')}>Player {player} {type}</span>;
    const selectedClass = selected === true ? 'selected' : '';

    return (
      <button className={cx('piece', 'moveable', colour, type, selectedClass)}
        onClick={
          (event) => {
            event.preventDefault();
            setPieceSelection(cellRef);
          }
        }>{accessibleInfo}</button>
    );

  }

}
