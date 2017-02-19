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
      <div className={cx('container', 'header-container')}>
        <div className={cx('col-md-12')}>
          <h1>React Draughts</h1>
          <p><a href="https://github.com/ReallySmall/react-draughts">github.com/ReallySmall/react-draughts</a> (work in progress)</p>
        </div>
      </div>
    );

  }

}

Header.propTypes = {};
