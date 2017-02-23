import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_crown';

const cx = classNames.bind(styles);

export default class Crown extends Component {

  render(){
    
    return ( 
      	<span className={cx('crown')}>
          	<span className={cx('point')}></span>
          	<span className={cx('point')}></span>
          	<span className={cx('point')}></span>
          	<span className={cx('point')}></span>
          	<span className={cx('point')}></span>
		</span>
    );
  }

}
