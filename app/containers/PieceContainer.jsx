import React, { Component, PropTypes } from 'react';
import Dimensions from 'react-dimensions'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearPieceSelections, moveActivePieceToHere, setPieceSelection } from 'actions/pieces';
import { DragSource, DropTarget } from 'react-dnd';
import { find } from 'underscore';
import ActivePiece from 'components/ActivePiece';
import InactivePiece from 'components/InactivePiece';
import Landing from 'components/Landing';
import * as types from 'constants/index';

const dragDropSource = {

  beginDrag: (props) => {
    return {
      draggedCellRef: props.cellRef
    };
  },

  endDrag: (props, monitor, component) => {

    if (!monitor.didDrop()) {
      return;
    }

    // When dropped on a compatible target, do something
    const dropSquare = monitor.getDropResult();

  }

};

const dragDropTarget = {
  drop: (props) => {
    return {
      droppedOnCellRef: props.cellRef
    }
  }
};

const dragDropSourceCollect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    draggedItem: monitor.getItem(),
    isDragging: monitor.isDragging(),
    dragResult: monitor.getDropResult(),
    connectDragPreview: connect.dragPreview()
  }
};

const dragDropTargetCollect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    didDrop: monitor.didDrop(),
    dragResult: monitor.getDropResult()
  }
};

class PieceContainer extends Component {

  	constructor(props) {
    	super(props);
  	};

  	render() {

      const { activePlayer, pieces, cellRef, containerWidth, clearPieceSelections, moveActivePieceToHere, setPieceSelection, connectDragSource, draggedItem, connectDragPreview, dragResult, isDragging, isOver, didDrop, connectDropTarget, pieceWidth } = this.props;
      const thisPiece = pieces[cellRef];

      let markup = null;

      if(thisPiece){

        const isLanding = thisPiece.type === 'landing' ? true : false;
        const isActive = thisPiece.active;

        if(isActive && !isLanding){

          markup = <ActivePiece {...thisPiece} 
                      clearPieceSelections={clearPieceSelections} 
                      setPieceSelection={setPieceSelection}
                      connectDragSource={connectDragSource}
                      connectDragPreview={connectDragPreview}
                      draggedItem={draggedItem}
                      isDragging={isDragging}
                      isOver={isOver}
                      pieceWidth={containerWidth}/>

        } else if(!isActive && !isLanding){

          markup = <InactivePiece {...thisPiece} />;

        } else if(isLanding){

          markup = <Landing {...thisPiece} 
                      moveActivePieceToHere={moveActivePieceToHere} 
                      connectDropTarget={connectDropTarget} 
                      isOver={isOver} 
                      didDrop={didDrop}
                      dragResult={dragResult} />

        }

      }

	  	return (
        <div>
          {markup}
        </div>
	  	);

  	}
};

PieceContainer.propTypes = {
  // todo
};   

function mapDispatchToProps(dispatch) {
  return {
    clearPieceSelections: () => dispatch(clearPieceSelections()),
    setPieceSelection: (piece) => dispatch(setPieceSelection(piece)),
    moveActivePieceToHere: (piece) => dispatch(moveActivePieceToHere(piece))
  }
};

export default compose(
  Dimensions(),
  DragSource(types.ACTIVE_PIECE, dragDropSource, dragDropSourceCollect),
  DropTarget(types.ACTIVE_PIECE, dragDropTarget, dragDropTargetCollect),
  connect(null, mapDispatchToProps)
)(PieceContainer);
