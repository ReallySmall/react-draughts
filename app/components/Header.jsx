import React, { Component, PropTypes } from 'react';
import {map} from "underscore";
import classNames from 'classnames/bind';
import styles from 'css/components/_header';
import { Link } from 'react-router';
import Navigation from 'components/Navigation';
import CookieBanner from 'components/CookieBanner';
import LegacyWarning from 'components/LegacyWarning';

const cx = classNames.bind(styles);

export default class Header extends Component {

  constructor(props) {
    super(props);
  };

  render() {

    return (
      <div className={cx('header-container')}>
          <header className={cx('site-header')}>
                      </header>
      </div>
    );

  }

}

Header.propTypes = {};
