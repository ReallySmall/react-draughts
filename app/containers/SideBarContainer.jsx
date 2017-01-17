import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeGridSize, startGame } from 'actions/game';
import GameSettings from 'components/GameSettings';
import CurrentGame from 'components/CurrentGame';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';
import SideBar from 'components/SideBar';

const cx = classNames.bind(styles);

class SideBarContainer extends Component {

  render(){

  	const { game, changeGridSize, startGame } = this.props;

    return (
    	<SideBar {...game} changeGridSize={changeGridSize} startGame={startGame} />
    );

  }

};

function mapStateToProps(state, props) {

  return {
    game: state.game
  };
  
}

function mapDispatchToProps(dispatch) {
  return {
    changeGridSize: (size) => dispatch(changeGridSize(size)),
    startGame: () => dispatch(startGame())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);

