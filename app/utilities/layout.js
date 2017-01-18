var createPieces = function(gridSize, piecesPerPlayer) {
	
	if(gridSize && piecesPerPlayer){

		let pieces = [];
		let piecesDeployed = 0;

		for(let i = 0; i < gridSize; i++){

	      const rowId = i;

	      for(let j = 0; j < gridSize; j++){

	        const colId = j;
	        const cellRef = { row: i, col: j}; // ref to this cell in the grid
	        const modifier = rowId % 2 === 0 ? 0 : 1;
	        const inGame = (colId + modifier) % 2 === 0 ? true : false;

	        if(inGame && piecesDeployed < piecesPerPlayer){

		        let piece = { cellRef: cellRef, player: 1, type: 'pawn', selected: false };

    	        piecesDeployed++;
    		    pieces.push(piece); // add piece

	        }

	      }

	    }

		return pieces;

	}

};

export { createPieces };

