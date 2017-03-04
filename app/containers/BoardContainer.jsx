import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Board from 'components/Board';

class BoardContainer extends Component {

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
