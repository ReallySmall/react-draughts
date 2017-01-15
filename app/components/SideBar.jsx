import React, { Component, PropTypes } from 'react';
import GameSettings from 'components/GameSettings';
import CurrentGame from 'components/CurrentGame';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';

const cx = classNames.bind(styles);

export default class SideBar extends Component {

  render(){

  	const { activePlayer, started, lastMove } = this.props;

    return (
		<div className={cx('col-md-3')}>
			{!started && <GameSettings />}
			{started && <CurrentGame />}
        </div>
    );
  }

}
