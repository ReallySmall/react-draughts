import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { setGameType, startGame, endGame } from 'actions/game';
import GameSettings from 'components/GameSettings';
import CurrentGame from 'components/CurrentGame';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';
import SideBar from 'components/SideBar';

const cx = classNames.bind(styles);

class SideBarContainer extends Component {

  render(){

  	const { game, setGameType, startGame, endGame } = this.props;

    return (
    	<SideBar {...game} setGameType={setGameType} startGame={startGame} endGame={endGame} />
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
    setGameType: (typeId) => dispatch(setGameType(typeId)),
    startGame: () => dispatch(startGame()),
    endGame: () => dispatch(endGame())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBarContainer);

