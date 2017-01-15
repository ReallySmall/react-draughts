import React, { Component, PropTypes } from 'react';
import classNames from 'classnames/bind';
import styles from 'css/components/_loading';

const cx = classNames.bind(styles);

export default class CurrentGame extends Component {

  render(){

    return (
    	<aside>
            <h2>Current Game</h2>
        </aside>
    );
  }

}
