import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import {map, contains, find} from "underscore";
import Square from 'components/square';
import Piece from 'components/piece';
import classNames from 'classnames/bind';
import styles from 'css/components/_board';

const cx = classNames.bind(styles);

export default class Board extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    const { pieces, gridSize, activePlayer, started } = this.props;
    let grid = []; // grid to populate with squares

    for(let i = 0; i < gridSize; i++){

      const rowId = i;
      let row = []; // create row

      for(let j = 0; j < gridSize; j++){

        const colId = j;
        const cellRef = { row: i, col: j}; // ref to this cell in the grid

        let piece = find(pieces, function(piece) { // fetch any piece with a mtaching cell ref
          return piece.cellRef.row === rowId && piece.cellRef.col == colId; 
        }) || null;

        if(piece){
          piece.activePlayer = activePlayer;
        } else {
          let piece = { cellRef: { row: i, col: j}, player: 0, type: 'empty', selected: false }
        }

        row.push(<Square key={j} {...cellRef}><Piece {...piece} /></Square>); // add square to row

      }

      grid.push(row); // add row to grid

    }

    return (
      <div className={cx('col-md-9')}>
          <section>
            <div className={cx('board')}>
              {grid}
            </div>
          </section>
      </div>
    );

  }
};    

Board.propTypes = {
};
