import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Page from 'components/Page';
import Homepage from 'components/Homepage';
import BoardContainer from 'containers/BoardContainer';
import SideBarContainer from 'containers/SideBarContainer';

class HomepageContainer extends Component {

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
