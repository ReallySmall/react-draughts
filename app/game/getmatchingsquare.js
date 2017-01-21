var getMatchingSquare = function(square1, square2) {
  if(square1.cellRef.row === square2.cellRef.row && square1.cellRef.col === square2.cellRef.row){
    return true;
  };
  return false;
};

export { getMatchingSquare }