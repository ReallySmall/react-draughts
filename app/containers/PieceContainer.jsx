import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearPieceSelections, moveActivePieceToHere, setPieceSelection } from 'actions/pieces';
import { find } from "underscore";
import { isClient } from 'helpers/environment';
import { fetchWrapper } from 'actions/wrapper';
import { changeGridSize } from 'actions/game';
import { createPieces } from 'game/setuppieces';
import { availableMoves } from 'game/updatepieces';
import ActivePiece from 'components/ActivePiece';
import InactivePiece from 'components/InactivePiece';
import Landing from 'components/Landing';

class PieceContainer extends Component {

  	constructor(props) {
    	super(props);
  	};

  	render() {

      const { activePlayer, pieces, row, col, clearPieceSelections, moveActivePieceToHere, setPieceSelection } = this.props;

      const colours = ['', 'player1', 'player2'];

      let markup = null;
      let thisPiece = null;
      let isLanding = null;
      let isActive = false;

      for(let i = 0; i < pieces.length; i++){
        if(pieces[i].cellRef.row === row && pieces[i].cellRef.col === col){
          thisPiece = pieces[i];
        }
      }

      if(thisPiece){

        thisPiece.colour = colours[thisPiece.player];
        isLanding = thisPiece.type === 'landing' ? true: false;

        if(thisPiece.player === activePlayer){
          isActive = availableMoves(pieces, thisPiece).length > 0 ? true : false;
        }

        if(isActive && !isLanding){
          markup = <ActivePiece {...thisPiece} clearPieceSelections={clearPieceSelections} setPieceSelection={setPieceSelection} />
        } else if(!isActive && !isLanding){
          markup = <InactivePiece {...thisPiece} />;
        } else if(isLanding){
          markup = <Landing {...thisPiece} moveActivePieceToHere={moveActivePieceToHere} />
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

export default connect(null, mapDispatchToProps)(PieceContainer);
