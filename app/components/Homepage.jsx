import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_home-page';
import Helmet from 'react-helmet';
import Board from 'components/Board';
import GameSettings from 'components/GameSettings'; 
import CurrentGame from 'components/CurrentGame'; 
import GameProgress from 'components/GameProgress'; 

const cx = classNames.bind(styles);

export default class Homepage extends Component {

	constructor(props) {
  	super(props);
	};

	render() {

  	return (
    	<div className={cx('page', 'home-page', 'container', 'container-wrapper')}>
        <div className={cx('col-md-12')}>
          <h1>React Draughts</h1>
          <p>Universal React with Redux</p>
          <p><strong>WORK IN PROGRESS :)</strong></p>
        </div>
        {React.cloneElement(this.props.children, {...this.props})}
      </div>
  	);

	}
};
