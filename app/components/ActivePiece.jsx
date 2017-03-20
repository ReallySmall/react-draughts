import React, { Component, PropTypes } from 'react';
import Crown from 'components/Crown';
import classNames from 'classnames/bind';
import styles from 'css/components/_piece';
import * as types from 'constants/index';

const cx = classNames.bind(styles);

export default class ActivePiece extends Component {

  componentDidMount(){

    const { connectDragPreview, pieceWidth } = this.props;
    const canvas = document.createElement('canvas');
    
    canvas.width = pieceWidth + 10;
    canvas.height = pieceWidth + 10;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = (canvas.width / 2) - 4;

    let context = canvas.getContext('2d');

    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'yellow';
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();

    const img = new Image();
    
    img.src = canvas.toDataURL();

    img.onload = function () {
      connectDragPreview(img);
    };

  };

  render(){

  	const { colour, cellRef, player, type, selected, setPieceSelection, connectDragSource, isDragging, isOver, dragResult } = this.props;
  	const accessibleInfo = <span className={cx('visually-hidden')}>Player {player} {type}</span>;
    const selectedClass = selected === true ? 'selected' : '';

    return (
      connectDragSource(
        <button 
          style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move'
          }}
          className={cx('piece', 'moveable', colour, selectedClass)}
          onFocus={
            (event) => {
              event.preventDefault();
              setPieceSelection(cellRef);
            }
          }>{accessibleInfo}{type === 'king' && <Crown/>}</button>
      )
    );

  }

}