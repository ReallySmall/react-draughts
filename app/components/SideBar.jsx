import React, { Component, PropTypes } from 'react';
import GameSettings from 'components/GameSettings';
import CurrentGame from 'components/CurrentGame';
import classNames from 'classnames/bind';
import styles from 'css/components/_side-bar';

const cx = classNames.bind(styles);

export default class SideBar extends Component {

  render(){

  	const { activePlayer, players, started, finished, history, setGameType, startGame, endGame } = this.props;

    return (
		<div className={cx('col-md-3', 'side-bar')}>
			{!started && <GameSettings setGameType={setGameType} players={players} startGame={startGame} />}
			{started && <CurrentGame activePlayer={activePlayer} players={players} history={history} finished={finished} endGame={endGame} />}
        </div>
    );

  }

}
