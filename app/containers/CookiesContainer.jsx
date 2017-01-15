import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchWrapper } from 'actions/wrapper';
import Page from 'components/Page';

class CookiesContainer extends Component {

    //Data that needs to be called before rendering the component
    //This is used for server side rending via the fetchComponentDataBeforeRending() method
    static need = [
      fetchWrapper
    ];

    constructor(props) {
      super(props);
    };

    componentWillMount() {};

    render() {

      const { content, isFetching, requestFailed } = this.props;
      const { policyContent } = content.messages.cookies;

      return (
        <Page isFetching={isFetching} requestFailed={requestFailed} content={policyContent} >
          <h1>Cookie Policy</h1>
        </Page>
      );

    }
};

CookiesContainer.propTypes = {
  // todo
};

function mapStateToProps(state, props) {

  return {
    content: state.wrapper.content
  };
  
}

export default connect(mapStateToProps)(CookiesContainer);
