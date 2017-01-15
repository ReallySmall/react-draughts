import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';

const cx = classNames.bind(styles);

export default class Loading extends Component {

  render(){

  	const { size, message } = this.props;

    return (
		<p className={cx('loading', 'plain', 'no-script-hide', 'size-' + size)}>
			<span className={cx('fa', 'fa-refresh', 'fa-spin')}> </span> <span className={cx('message')}>{message || 'Loading content'}</span>
		</p>
    );
  }

}
