import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { clearPieceSelections, setPieceSelection } from 'actions/pieces';
import { find } from "underscore";
import { isClient } from 'helpers/environment';
import { fetchWrapper } from 'actions/wrapper';
import { changeGridSize } from 'actions/game';
import { createPieces } from 'game/setuppieces';
import { availableMoves } from 'game/updatepieces';
import ActivePiece from 'components/ActivePiece';
import InactivePiece from 'components/InactivePiece';
import Destination from 'components/Destination';

class PieceContainer extends Component {

  	constructor(props) {
    	super(props);
  	};

  	render() {

      const { gridSize, activePlayer,pieces, row, col, clearPieceSelections, setPieceSelection } = this.props;

      const colours = ['', 'red', 'green'];

      let markup = null;
      let thisPiece = null;
      let isActive = null;
      let isLanding = null;

      for(let i = 0; i < pieces.length; i++){
        if(pieces[i].cellRef.row === row && pieces[i].cellRef.col === col){
          thisPiece = pieces[i];
        }
      }

      if(thisPiece){

        thisPiece.colour = colours[thisPiece.player];
        isLanding = thisPiece.type === 'landing' ? true: false;

        if(thisPiece.player === activePlayer){
          isActive = availableMoves(pieces, thisPiece, gridSize);
        } else {
          isActive === false;
        }

        if(isActive && !isLanding){
          markup = <ActivePiece {...thisPiece} pieces={pieces} clearPieceSelections={clearPieceSelections} setPieceSelection={setPieceSelection} />
        } else if(!isActive && !isLanding){
          markup = <InactivePiece {...thisPiece} />;
        } else if(isLanding){
          markup = <Destination {...thisPiece} pieces={pieces} clearPieceSelections={clearPieceSelections} setPieceSelection={setPieceSelection} />
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
    clearPieceSelections: (pieces) => dispatch(clearPieceSelections(pieces)),
    setPieceSelection: (pieces, piece) => dispatch(setPieceSelection(pieces, piece))
  }
};

export default connect(null, mapDispatchToProps)(PieceContainer);
