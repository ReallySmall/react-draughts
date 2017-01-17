import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeGridSize, startGame } from 'actions/game';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';

const cx = classNames.bind(styles);

export default class GameSettings extends Component {

  render(){

  	const { changeGridSize, startGame } = this.props;

    return (
    	<aside>
            <h2>Settings</h2>
            <button onClick={
            	(event) => {
            		event.preventDefault();
            		startGame();
            	}	
            }>Start game</button>
        </aside>
    );
  }

}
