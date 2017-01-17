import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchWrapper } from 'actions/wrapper';
import Page from 'components/Page';
import Homepage from 'components/Homepage';
import BoardContainer from 'containers/BoardContainer';
import SideBarContainer from 'containers/SideBarContainer';

class HomepageContainer extends Component {

    //Data that needs to be called before rendering the component
    //This is used for server side rending via the fetchComponentDataBeforeRending() method
    static need = [ fetchWrapper ];

    constructor(props) {
      super(props);
    };

    componentWillMount() {

    };

    render() {

      const { isFetching, requestFailed, game, content } = this.props;

      return (
        <Page isFetching={isFetching} requestFailed={requestFailed} internalMarkup="false">
          <BoardContainer />
          <SideBarContainer />
        </Page>
      );

    }
};

function mapStateToProps(state, props) {

  return {
    game: state.game,
  };
  
}

export default connect(mapStateToProps)(HomepageContainer);
