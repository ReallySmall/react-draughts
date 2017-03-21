import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Square from 'components/Square';
import PieceContainer from 'containers/PieceContainer';
import classNames from 'classnames/bind';
import styles from 'css/components/_board';

const cx = classNames.bind(styles);

class Board extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    const { grid, gridSize, activePlayer, pieces } = this.props;
    let board = [];

    for(let i = 0; i < grid.length; i++){

      let row = grid[i];

      for(let j = 0; j < row.length; j++){

        const square = row[j];
        const { cellRef, inGame, style } = square;

        board.push(

          <Square key={i + '-' + j} gridSize={gridSize} inGame={inGame} style={style}>
            <PieceContainer ref="piece" cellRef={cellRef} activePlayer={activePlayer} pieces={pieces} />
          </Square>

        );
      }

    }    


    return (
      <div className={cx('col-lg-9', 'board-wrapper')} ref="board">
          <section>
            <h2 className={cx('visually-hidden')}>Board</h2>
            <div className={cx('board')}>
              {board}
            </div>
          </section>
      </div>
    );

  }
};    

Board.propTypes = {
};

export default DragDropContext(HTML5Backend)(Board);