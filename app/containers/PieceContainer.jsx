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

      const { activePlayer, pieces, cellRef, clearPieceSelections, moveActivePieceToHere, setPieceSelection } = this.props;
      const thisPiece = pieces[cellRef];

      let markup = null;

      if(thisPiece){

        const isLanding = thisPiece.type === 'landing' ? true : false;
        const isActive = thisPiece.active;;

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
