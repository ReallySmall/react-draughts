import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchWrapper } from 'actions/wrapper';
import Board from 'components/Board';

class BoardContainer extends Component {

  	//Data that needs to be called before rendering the component
  	//This is used for server side rending via the fetchComponentDataBeforeRending() method
  	static need = [
    	fetchWrapper
  	];

  	constructor(props) {
    	super(props);
  	};

  	render() {

      const { game } = this.props;

	  	return (
        <Board {...game} />
	  	);

  	}
};

BoardContainer.propTypes = {
  // todo
};

function mapStateToProps(state, props) {

  return {
    game: state.game
  };
  
};

export default connect(mapStateToProps)(BoardContainer);
