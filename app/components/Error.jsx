import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_error';

const cx = classNames.bind(styles);

export default class Error extends Component {

  render(){

  	const { size, message } = this.props;

    return ( 
		<p className={cx('error', 'icon', 'col-md-12', 'plain', 'size-' + size)}>
			<span className={cx('fa', 'fa-times-circle')}> </span> {message || 'Loading error'}
		</p>
    );
  }

}
