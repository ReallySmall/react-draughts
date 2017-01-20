import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_piece';

const cx = classNames.bind(styles);

export default class Destination extends Component {

  render(){
    return (
      <button className={cx('piece','available', 'plain')}></button>
    );
  }

}
