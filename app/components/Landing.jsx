import React, { Component, PropTypes } from 'react';
import { toFriendlyGridRef } from 'game/helpers';
import classNames from 'classnames/bind';
import styles from 'css/components/_piece';

const cx = classNames.bind(styles);

export default class Landing extends Component {

  componentWillUpdate(props){

    const { didDrop, cellRef, dragResult, moveActivePieceToHere } = props;

    if(props.didDrop && dragResult.droppedOnCellRef === cellRef){
      moveActivePieceToHere(cellRef);
    }

  };

  render(){

    const { cellRef, moveActivePieceToHere, connectDropTarget, isOver, didDrop } = this.props;
    const dragOver = isOver ? 'drag-over' : '';

    return connectDropTarget(
      <button className={cx('piece','landing', 'plain', dragOver)}
  	    onClick={
          (event) => {
            event.preventDefault();
            moveActivePieceToHere(cellRef);
          }}>
          <span className={cx('cell-ref')}>{toFriendlyGridRef(cellRef)}</span>
          <span className={cx('visually-hidden')}>Move selected piece to here</span>
      </button>
    );

  }

};
