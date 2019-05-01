import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {AppBar, Toolbar, Tabs, Tab, Link, Typography, IconButton, Modal, Button } from '@material-ui/core';
import AccountIcon from '@material-ui/icons/Person';
import { Breadcrumbs} from '@material-ui/lab';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { AppBarTheme } from '../common/theme';
import { HEADER_MENU } from '../common/navigation';
import { DEFAULT_BREADCRUMB, } from '../common/constant';
import Styles from './style/header.module.scss';
import { toggleLoader, enqueueInformation, setCurrentPage, enqueueBreadCrumb, replaceBreadCrumb, } from '../module/action/common'
import uuid from '../utility/uuid'
import face_auth_bg from '../common/image/scan/face_auth.png'
import Loader from '../component/loader';
import Notifier from '../component/notifier';

class header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_auth: null,
    }
  };

  toHome = () => {
    this.props.replaceBreadCrumb();
    const { history } = this.props;
    history.push("/")
  }

  accessToContents = (breadcrumb) => {
    this.props.setCurrentPage(breadcrumb.key);
    this.props.enqueueBreadCrumb(breadcrumb);
    this.props.history.push(breadcrumb.url);
  };

  changeTab = (event, value) => {
    this.accessToContents(value);
  }

  openAccountMenu = () => {
    this.setState({
      modal_auth: true,
    });

    setTimeout(() => {
      this.props.toggleLoader();
    },500);

    setTimeout(() => {
      this.props.enqueueInformation(`ようこそ ${this.props.account.base.name}様`);
      this.props.toggleLoader();
      this.closeAccountMenu();
    },3000);
  }

  closeAccountMenu = () => {
    this.setState({
      modal_auth: false,
    })
  }

  render() {
    const {
      breadcrumb,
      current_page,
    } = this.props;

    return (
      <React.Fragment>
        <MuiThemeProvider theme={AppBarTheme}>
          <AppBar className={Styles.appbar} position="sticky">
            <Toolbar className={Styles.toolbar}>
              <Link className={Styles.logo} onClick={this.toHome} >NRI</Link>
              <div className={`${Styles.action} ${Styles.flex} ${Styles.row}`}>
                <IconButton color="inherit" aria-label="Account" onClick={this.openAccountMenu}>
                  <AccountIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
        {(() => {
          let menu = HEADER_MENU.filter((menu) => {
            return menu.key === current_page
          });
          menu = menu.shift();
          if (menu && menu.nav) {
            return (
              <Tabs variant="fullWidth" className={Styles.tabs} value={false} onChange={this.changeTab}>
                {menu.nav.map((nav) => {
                  return (
                    <Tab key={uuid.getUuid()} className={Styles.tab} label={nav.title} value={nav} />
                  )
                })}
              </Tabs>
            )
          }
        })()}

        {(() => {
          if (breadcrumb.length > 1) {
            return (
              <Breadcrumbs className={Styles.breadcrumbs} maxItems={3}>
                {breadcrumb.map((fragment, index) => {
                  if (breadcrumb.length - 1 === index) {
                    return (
                      <Typography key={uuid.getUuid()} color="textPrimary" >
                        {fragment.title}
                      </Typography>
                    )
                  } else {
                    return (
                      <Link key={uuid.getUuid()} className={Styles[fragment.color]} color={fragment.color} onClick={this.accessToContents.bind(this, fragment)}  >
                        {fragment.title}
                      </Link>
                    )
                  }
                })}
              </Breadcrumbs>
            )
          }
        })()}

        {(() => {
          return (
            <Modal
              open={this.state.modal_auth ? true : false}
              className={Styles.modal}>
              <div className={Styles.contents}>
                <h3 className={Styles.title}>Face ID</h3>
                <img className={Styles.image} src={face_auth_bg} alt="faceAuthrization" />
                <div className={Styles.actions}>
                  <Button color="secondary" className={Styles.cancel} onClick={this.close} >キャンセル</Button>
                </div>
              </div>
            </Modal>
          )
        })()}

        <Notifier />
        <Loader />
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    account: store.account,
    breadcrumb: store.common.breadcrumb,
    current_page: store.common.current_page,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    toggleLoader() {
      dispatch(toggleLoader());
    },
    enqueueInformation(message) {
      const duration = 2000;
      const snackMessage = {
        message: message,
        options: {
          variant: 'success',
          autoHideDuration: duration,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          }
        },
      };
      dispatch(enqueueInformation(snackMessage));
    },
    setCurrentPage(page) {
      dispatch(setCurrentPage(page));
    },
    enqueueBreadCrumb(breadcrumb) {
      dispatch(enqueueBreadCrumb(breadcrumb));
    },
    replaceBreadCrumb() {
      dispatch(replaceBreadCrumb([DEFAULT_BREADCRUMB]));
    },
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(header))