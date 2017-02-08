import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from 'components/Header';

class HeaderContainer extends Component {

    constructor(props) {
      super(props);
    };

    render() {

      return (
        <Header />
      );

    }
};

HeaderContainer.propTypes = {};

function mapStateToProps(state) {
  return {
    content: state.wrapper.content,
    route: state.routing
  };
}

export default connect(mapStateToProps)(HeaderContainer);
