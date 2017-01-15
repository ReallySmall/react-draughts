import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { browserHistory, Router, Route, IndexRoute, Link } from 'react-router';
import Helmet from 'react-helmet';
import config from 'helmconfig.js';
import HeaderContainer from 'containers/HeaderContainer';
import FooterContainer from 'containers/FooterContainer';
import classNames from 'classnames/bind';
import 'css/main';
import styles from 'css/main';

import { fetchWrapper } from 'actions/wrapper';

const cx = classNames.bind(styles);

const App = ({children, location}) => {

  //Data that needs to be called before rendering the component
  //This is used for server side rending via the fetchComponentDataBeforeRending() method
  const need = [ fetchWrapper ];

  return (
    <div>
      <Helmet {...config}/>
      <div className={cx('view-container')}>
        <div className={cx('page-backing')}>
          <div className={cx('container')}></div>
        </div>
        <ReactCSSTransitionGroup 
          component="div"
          transitionName="fade" 
          transitionEnterTimeout={250} 
          transitionLeaveTimeout={250}>
            {React.cloneElement(children, {
              key: location.pathname
            })}
        </ReactCSSTransitionGroup>
     	</div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.object
};

export default App;
