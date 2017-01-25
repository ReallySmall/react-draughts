import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import Square from 'components/Square';
import PieceContainer from 'containers/PieceContainer';
import classNames from 'classnames/bind';
import styles from 'css/components/_board';

const cx = classNames.bind(styles);

export default class Board extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    const { pieces, gridSize, activePlayer } = this.props;

    let grid = []; // grid to populate with squares

    for(let i = 0; i < gridSize; i++){

      const rowId = i;
      let row = []; // create row

      for(let j = 0; j < gridSize; j++){

        const colId = j;
        const cellRef = { row: i, col: j}; // ref to this cell in the grid
        const modifier = rowId % 2 === 0 ? 0 : 1;
        const inGame = (colId + modifier) % 2 === 0 ? true : false;

        row.push(<Square key={j} gridSize={gridSize} inGame={inGame}><PieceContainer pieces={pieces} {...cellRef} gridSize={gridSize} activePlayer={activePlayer} /></Square>); // add square to row

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
