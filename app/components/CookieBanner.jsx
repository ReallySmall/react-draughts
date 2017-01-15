import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import styles from 'css/components/_cookie-banner';
import { Link } from 'react-router';
import cookie from 'react-cookie';

const cx = classNames.bind(styles);

export default class CookieBanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
      acceptCookiesRequired: false
    };
  };

  componentDidMount() {
    this.setState({acceptCookiesRequired: cookie.load('_accepted_cookies') ? false : true });  
  };

  render() {

    const { bannerMessage, bannerButtonMessage } = this.props.content;

    if (!this.state.acceptCookiesRequired) {
      return (<div/>);
    }
    return (
      <div className={cx("header-message", "cookie")}>
        {bannerMessage && bannerButtonMessage &&
          <div className={cx("container")}>
            <div className={cx("row")}>
              <p className={cx('plain', 'col-sm-12')}>
                <span>{bannerMessage} | <Link to={'/cookies'}>Read more</Link></span>
                <button onClick={(event) => { 
                  event.preventDefault();
                  cookie.save('_accepted_cookies', 'true', { maxAge: 31536000, path: '/' });
                  const cookiesAccepted = {
                    acceptCookiesRequired: false
                  };
                  this.setState(cookiesAccepted);
                }}>{bannerButtonMessage}</button>
              </p>
            </div>
          </div>
        }
      </div>
    );
  }

}