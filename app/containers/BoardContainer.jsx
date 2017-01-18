import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { isClient } from 'utilities/environment';
import { fetchWrapper } from 'actions/wrapper';
import { changeGridSize } from 'actions/game';
import { createPieces } from 'utilities/layout';
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
      const pieces = createPieces(game.gridSize, game.startingPieceCount);

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
