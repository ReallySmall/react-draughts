var createPieces = function(gridSize, piecesPerPlayer) {
	
	if(gridSize && piecesPerPlayer){

		let pieces = [];
		let playerOnePiecesDeployed = 0;
		let playerTwoPiecesDeployed = 0;

		for(let i = 0; i < gridSize; i++){ // create player 1 pieces

	      const rowId = i;

	      for(let j = 0; j < gridSize; j++){

	        const colId = j;
	        const cellRef = { row: i, col: j}; // ref to this cell in the grid
	        const modifier = rowId % 2 === 0 ? 0 : 1;
	        const inGame = (colId + modifier) % 2 === 0 ? true : false;

	        if(inGame && playerOnePiecesDeployed < piecesPerPlayer){

		        let piece = { 
		        	cellRef: cellRef, 
		        	player: 1, 
		        	type: 'pawn', 
		        	active: false, 
		        	selected: false 
		        };

    	        playerOnePiecesDeployed++;
    		    pieces.push(piece); // add piece

	        }

	      }

	    };

	    for(let i = gridSize; i > 0; i--){ // create player 1 pieces

	      	const rowId = i;

	      	for(let j = gridSize; j > 0; j--){

	        	const colId = j;
	        	const cellRef = { row: i, col: j}; // ref to this cell in the grid
	        	const modifier = rowId % 2 === 0 ? 0 : 1;
	        	const inGame = (colId + modifier) % 2 === 0 ? true : false;

	        	if(inGame && playerTwoPiecesDeployed < piecesPerPlayer){

			        let piece = { 
			        	cellRef: cellRef, 
			        	player: 2, 
			        	type: 'pawn', 
			        	active: false, 
			        	selected: false 
			        };

    	        	playerTwoPiecesDeployed++;
    		    	pieces.push(piece); // add piece

	        	}

	      	}

	    }

		return pieces;

	}

	return [];

};

export { createPieces };

