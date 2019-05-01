import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  ACCOUNT_MENU,
} from '../common/navigation';
import Styles from './account_menu.module.scss';
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
} from '@material-ui/core';
import {
  enqueueBreadCrumb,
  setCurrentPage,
} from '../module/action/common';
import uuid from '../utility/uuid';

class account_menu extends Component {
  constructor(props) {
    super(props);
  };

  componentDidMount = () => {
    this.setState({
      open: true,
    });
  }

  accessToContents = (account) => {
    this.props.setCurrentPage(account.key);
    this.props.enqueueBreadCrumb(account);
    this.props.history.push(account.url)
  };

  render() {

    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          <h3 className={`${Styles.title} ${Styles.insurancer}`}>アカウント情報</h3>
          <List className={Styles.procedures}>
            {ACCOUNT_MENU.map(account => {
              return (
                <React.Fragment>
                  <ListItem key={uuid.getUuid()} className={Styles.procedure} onClick={this.accessToContents.bind(this, account)} >
                    <Avatar>
                      <img className={Styles.image} src={account.icon} />
                    </Avatar>
                    <ListItemText className={Styles.label}
                      primary={account.title}
                      secondary={account.sub_title} />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              )
            })}
          </List>
        </section>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    policy: store.policy,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    enqueueBreadCrumb(breadcrumb) {
      dispatch(enqueueBreadCrumb(breadcrumb));
    },
    setCurrentPage(key) {
      dispatch(setCurrentPage(key));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(account_menu);