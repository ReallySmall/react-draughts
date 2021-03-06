import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import styles from 'css/components/_form';

const cx = classNames.bind(styles);

export default class GameSettings extends Component {

  render(){

  	const { setGameType, players, startGame } = this.props;

    return (
    	<aside>
            <h2>Settings</h2>
            <form className={cx('form')}>
                <div className={cx('form-control')}>
                    <label htmlFor="select-game-type">Select game type</label>
                    <select id="select-game-type" onChange={
                    	(event) => {
                    		event.preventDefault();
                    		setGameType(event.target.value);
                    	}
                    }>
                    	<option value="0">Standard</option>
                    	<option value="1">Sparse</option>
                    	<option value="2">Crowded</option>
                        <option value="3">Small</option>
                    </select>
                </div>
                <button onClick={
                	(event) => {
                		event.preventDefault();
                		startGame(event.target.value);
                	}	
                }>Start game</button>
            </form>
        </aside>
    );
  }

}
