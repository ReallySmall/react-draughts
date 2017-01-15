import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';

const cx = classNames.bind(styles);

export default class GameProgress extends Component {

  render(){

  	const { size, message } = this.props;

    return (
    	<div>History</div>
    );
  }

}
