var createGrid = function(gridSize){

	if(gridSize){

		let grid = []; // grid to populate with squares

	    for(let i = 0; i < gridSize; i++){

	      const rowId = i;
	      let row = []; // create row

	      for(let j = 0; j < gridSize; j++){

	        const colId = j;
	        const cellRef = { row: i, col: j}; // ref to this cell in the grid
	        const modifier = rowId % 2 === 0 ? 0 : 1;
	        const inGame = (colId + modifier) % 2 === 0 ? true : false;
	        const style = {
		      width: 100 / gridSize + '%',
		      paddingBottom: 100 / gridSize + '%',
		      backgroundPositionX: Math.random() * 100 + '%',
		      backgroundPositionY: Math.random() * 100 + '%'
		    };

	        row.push({ cellRef, gridSize, inGame, style });

	      }

	      grid.push(row); // add row to grid

	    }

	    return grid;

	}

	return [];

};

var createPieces = function(gridSize, piecesPerPlayer) {
	
	if(gridSize && piecesPerPlayer){

		let pieces = [];
		let playerOnePiecesDeployed = 0;
		let playerTwoPiecesDeployed = 0;

		for(let i = 0; i < gridSize; i++){ // create player 1 pieces

	      const rowId = i;

	      for(let j = 0; j < gridSize; j++){

	        const colId = j;
	        const cellRef = { row: rowId, col: colId }; // ref to this cell in the grid
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

	    for(let k = gridSize - 1; k >= 0; k--){ // create player 2 pieces

	      	const rowId = k;

	      	for(let l = gridSize - 1; l >= 0; l--){

	        	const colId = l;
	        	const cellRef = { row: rowId, col: colId}; // ref to this cell in the grid
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

export { createGrid, createPieces };
