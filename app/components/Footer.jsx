import React, { Component, PropTypes } from 'react';
import {map} from "underscore";
import classNames from 'classnames/bind';
import styles from 'css/components/_footer';

const cx = classNames.bind(styles);

export default class Footer extends Component {

  render() {

    return (
      <footer id="footer" className={cx('footer', 'js-ui-sticky-footer')}>
        
      </footer>
    );
  }

}
