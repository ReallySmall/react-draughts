import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from 'css/components/_navigation';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Navigation extends Component {

  render() {

    return (
      <div className={cx('preface-area')}>
        <div className={cx('container')}>
          <nav className={cx('row')}>
            <h2 className={cx('visually-hidden')}>Navigation</h2>
            <ul>
              <li className={cx('col-sm-3')}>
                <Link className={cx('preface-block')} to="/boards" activeClassName={cx('active')}>
                  <h3><span className={cx('fa', 'fa-code-fork')}></span>Boards</h3>
                </Link>
              </li>
              <li className={cx('col-sm-3')}>
                <Link className={cx('preface-block')} to="/articles" activeClassName={cx('active')}>
                  <h3><span className={cx('fa', 'fa-files-o')}></span>Articles</h3>
                </Link>
              </li>
              <li className={cx('col-sm-3')}>
                <Link className={cx('preface-block')} to="/gallery" activeClassName={cx('active')}>
                  <h3><span className={cx('fa', 'fa-star')}></span>Gallery</h3>
                </Link>
              </li>
              <li className={cx('col-sm-3')}>
                <Link className={cx('preface-block')} to="/tools" activeClassName={cx('active')}>
                  <h3><span className={cx('fa', 'fa-gears')}></span>Tools</h3>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

}

Navigation.propTypes = {
};
