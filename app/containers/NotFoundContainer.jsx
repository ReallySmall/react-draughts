import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Page from 'components/Page';

class NotFoundContainer extends Component {

  	constructor(props) {
    	super(props);
  	};

  	render() {

	  	return (
        <Page>
          <Helmet 
            title="Not found" 
            meta={[
              {"name": "description", "content": "Sorry, this content doesn't exist" }
            ]}/>
          <p>Sorry, couldn't get this content. There may be a network error, or it might not exist.</p>
        </Page>
	  	);

  	}
};

NotFoundContainer.propTypes = {
  // todo
};

function mapStateToProps(state, props) {

  return {

  };
  
}

export default connect(mapStateToProps)(NotFoundContainer);
