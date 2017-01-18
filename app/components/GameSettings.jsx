import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';

const cx = classNames.bind(styles);

export default class GameSettings extends Component {

  render(){

  	const { setGameType, startGame } = this.props;

  	const gameTypes = [
  		{ gridSize: 8, pieces: 12},
  		{ gridSize: 10, pieces: 20},
  		{ gridSize: 10, pieces: 15}
  	];

    return (
    	<aside>
            <h2>Settings</h2>
            <label htmlFor="select-game-type">Select game type</label>
            <select id="select-game-type" onChange={
            	(event) => {
            		event.preventDefault();
            		setGameType(gameTypes[event.target.value]);
            	}
            }>
            	<option value="0">Standard</option>
            	<option value="1">Crowded</option>
            	<option value="2">Sparse</option>
            </select>
            <button onClick={
            	(event) => {
            		event.preventDefault();
            		startGame(event.target.value);
            	}	
            }>Start game</button>
        </aside>
    );
  }

}
