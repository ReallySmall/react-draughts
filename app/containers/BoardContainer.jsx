import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isClient } from 'utilities/environment';
import { fetchWrapper } from 'actions/wrapper';
import { changeGridSize } from 'actions/game';
import Board from 'components/Board';

class BoardContainer extends Component {

  	//Data that needs to be called before rendering the component
  	//This is used for server side rending via the fetchComponentDataBeforeRending() method
  	static need = [
    	fetchWrapper, changeGridSize
  	];

  	constructor(props) {
    	super(props);
  	};

    componentWillMount() {
    };

  	render() {

      const { game } = this.props;

      const pieces = [
        { cellRef: { row: 0, col: 0}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 0, col: 2}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 0, col: 4}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 0, col: 6}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 1, col: 1}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 1, col: 3}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 1, col: 5}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 1, col: 7}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 2, col: 0}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 2, col: 2}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 2, col: 4}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 2, col: 6}, player: 1, type: 'pawn', selected: false },
        { cellRef: { row: 5, col: 1}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 5, col: 3}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 5, col: 5}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 5, col: 7}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 6, col: 0}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 6, col: 2}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 6, col: 4}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 6, col: 6}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 7, col: 1}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 7, col: 3}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 7, col: 5}, player: 2, type: 'pawn', selected: false },
        { cellRef: { row: 7, col: 7}, player: 2, type: 'pawn', selected: false }
      ];

	  	return (
        <Board pieces={pieces} {...game} />
	  	);

  	}
};

BoardContainer.propTypes = {
  // todo
};

function mapStateToProps(state, props) {

  return {
    game: state.game,
    pieces: state.pieces
  };
  
}

export default connect(mapStateToProps)(BoardContainer);
