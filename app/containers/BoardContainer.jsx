import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearPieceSelections, setPieceSelection } from 'actions/pieces';
import { isClient } from 'helpers/environment';
import { fetchWrapper } from 'actions/wrapper';
import { changeGridSize } from 'actions/game';
import { createPieces } from 'game/setuppieces';
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

      const { game, clearPieceSelections, setPieceSelection } = this.props;
      let { pieces } = this.props;
      
      if(!pieces.length){
        pieces = createPieces(game.gridSize, game.startingPieceCount);
      }

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
  
};

function mapDispatchToProps(dispatch) {
  return {
    clearPieceSelections: (pieces) => dispatch(clearPieceSelections(pieces)),
    setPieceSelection: (pieces, piece) => dispatch(setPieceSelection(pieces, piece))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);
