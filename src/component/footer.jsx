import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './style/footer.module.scss';
import {
  FOOTER_NAVIGATION,
} from '../common/navigation';
import { SocialIcon } from 'react-social-icons';
import uuid from '../utility/uuid';

class footer extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const footer = FOOTER_NAVIGATION;
    return (
      <div className={Styles.root}>
        <aside className={Styles.navigations}>
          {(() => {
            return footer.map((nav) => {
              return (
                <section key={uuid.getUuid()} className={Styles.navigation}>
                  <h3 className={Styles.title}>{nav.title}</h3>
                  {nav.links.map((link) => {
                    return (
                    <p key={uuid.getUuid()} className={Styles.link}>link.title</p>
                    )
                  })}
                </section>
              )
            })
          })()}
        </aside>
        <div className={Styles.secondary}>
          <div className={Styles.socials}>
            <SocialIcon className={Styles.icon} network="facebook" bgColor="#ffffff" style={{ height: 30, width: 30 }}/>
            <SocialIcon className={Styles.icon} network="twitter" bgColor="#ffffff" style={{ height: 30, width: 30 }}/>
            <SocialIcon className={Styles.icon} network="instagram" bgColor="#ffffff" style={{ height: 30, width: 30 }}/>
          </div>
          <div className={Styles.copyright}>
            <small >© All Rights Reserved.</small>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {}
};

const mapStateToProps = state => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(footer);
