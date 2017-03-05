import { canCoronate, gridRefStringToNumericalArray, gridRefNumericalArrayToString, inMovementPlane, invertPlayDirection } from 'game/helpers';
import { unselectAllPieces, selectPiece, setActivePieces } from 'game/selectpieces';
import { potentialMoves, availableMoves, moveActivePiece } from 'game/movepieces';
import { createPieces } from 'game/setuppieces';

class Pieces {

    constructor(gridSize, pieces) {

    	this.gridSize = gridSize;
    	this.pieces = pieces || new Array();

    	this.createPieces = (gridSize, pieceCount) => { 
    		this.gridSize = gridSize;
			this.pieces = createPieces(this.gridSize, pieceCount);
			return this.pieces;
		};

		this.unselectAllPieces = () => { 
			this.pieces = unselectAllPieces(this.pieces);
			return this.pieces;
		};

		this.selectPiece = (activePieceCellRef) => { 
			this.pieces = selectPiece(this.pieces, activePieceCellRef, this.gridSize);
			return this.pieces;
		};

		this.setActivePieces = (activePlayer) => { 
			const active = setActivePieces(this.pieces, activePlayer, this.gridSize);
			this.pieces = active.pieces;
			return active;
		};

		this.moveActivePiece = (landingPieceCellRef) => { 
			const move = moveActivePiece(this.pieces, landingPieceCellRef, this.gridSize);
			this.pieces = move.pieces;
			console.log(move);
			return move;
		};

		this.setAvailableMoves = (activePlayer) => { 
			this.pieces = availableMoves(this.pieces, activePlayer, this.gridSize);
			return this.pieces;
		};

		this.getPotentialMoves = (activePieceCellRef, invert) => { 
			return potentialMoves(this.pieces, activePieceCellRef, this.gridSize, invert = false);
		};

		this.returnPieces = () => { 
			return this.pieces;
		};

    };

};

export { Pieces as default };