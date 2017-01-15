import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from 'css/components/_navigation';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default class Navigation extends Component {

  render() {

    return (
      <section className={cx('preface-area')}>
        <div className={cx('container')}>
          <nav className={cx('row')}>
            <ul>
              <li className={cx('col-sm-3')}>
                <Link className={cx('preface-block')} to="/boards" activeClassName={cx('active')}>
                  <h2><span className={cx('fa', 'fa-code-fork')}></span>Boards</h2>
                </Link>
              </li>
              <li className={cx('col-sm-3')}>
                <Link className={cx('preface-block')} to="/articles" activeClassName={cx('active')}>
                  <h2><span className={cx('fa', 'fa-files-o')}></span>Articles</h2>
                </Link>
              </li>
              <li className={cx('col-sm-3')}>
                <Link className={cx('preface-block')} to="/gallery" activeClassName={cx('active')}>
                  <h2><span className={cx('fa', 'fa-star')}></span>Gallery</h2>
                </Link>
              </li>
              <li className={cx('col-sm-3')}>
                <Link className={cx('preface-block')} to="/tools" activeClassName={cx('active')}>
                  <h2><span className={cx('fa', 'fa-gears')}></span>Tools</h2>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    );
  }

}

Navigation.propTypes = {
};
