import React, { Component, PropTypes } from 'react';
import { map } from 'underscore';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';

const cx = classNames.bind(styles);

export default class CurrentGame extends Component {

  render(){

  	const { activePlayer, history } = this.props;

    return (
    	<aside>
            <h2>Current Game</h2>
            <ul>
            	{map(history, function(gameEvent, i){
            		return (
            			<li>{gameEvent}</li>
            		)
            	})}
            </ul>
            <h3>Current player</h3>
            <p>{activePlayer}</p>
        </aside>
    );
  }

}
