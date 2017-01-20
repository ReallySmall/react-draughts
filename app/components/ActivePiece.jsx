import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_piece';

const cx = classNames.bind(styles);

export default class ActivePiece extends Component {

  render(){

  	const { pieces, cellRef, player, type, selected, clearPieceSelections, setPieceSelection } = this.props;
  	const accessibleInfo = <span className={cx('visually-hidden')}>Player {player} {type}</span>;
    const thisPiece = {
      cellRef: cellRef
    };

    return (
      <button className={cx('piece', 'moveable', colour, type)}
        onClick={
          (event) => {
            event.preventDefault();
            setPieceSelection(pieces, thisPiece);
          }
        }>{accessibleInfo}</button>
    );

  }

}