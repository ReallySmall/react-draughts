import React, { Component, PropTypes } from 'react';
import styles from 'css/components/_page';
import Helmet from "react-helmet";
import Loading from 'components/Loading';
import Error from 'components/Error';
import NotFoundContainer from 'containers/NotFoundContainer';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Page extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    const { isFetching, fetchingMessage, errorMessage, connectionError, requestFailed, customClass, title } = this.props;
    let internalMarkup = this.props.internalMarkup === 'false' ? false : true;

    return (
      <div className={cx('page', customClass)}>
        <div className={cx(internalMarkup ? 'container' : '')}>
          <div className={cx(internalMarkup ? 'col-md-12' : '')}>
            {this.props.children}
            {isFetching && !requestFailed && <div className={cx('container')}><div className={cx('col-md-12')}><Loading size="2x" message={fetchingMessage} /></div></div>}
            {requestFailed && !connectionError && <NotFoundContainer />}
            {requestFailed && connectionError && <div className={cx('col-md-12')}><Error message={errorMessage} size="2x" /></div>}
          </div>
        </div>
      </div>
    );

  }
};

Page.propTypes = {
};
