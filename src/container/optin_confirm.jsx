import React, { Component } from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import Styles from './style/optin_confirm.module.scss';
import { Button } from '@material-ui/core';
import Loader from '../component/loader';
import { enqueueInformation, toggleLoader, removeBreadCrumb } from '../module/action/common'
import uuid from '../utility/uuid';

// stub
import { Policies, DoctorsForMedicalRecords } from '../common/stub'

class optin_confirm extends Component {
  constructor(props) {
    super(props);

    // stub set
    const current_policy = this.props.policy.current_policy;
    const targetPolicies = Policies.filter((policy) => {
      return (policy.contract.policy_number == current_policy);
    });
    this.targetPolicy = targetPolicies.length ? targetPolicies.shift() : null;

    // state
    this.state = {
      submit: false,
    };
  };

  componentDidMount = () => {
    if (!this.props.optin.records.length) {
      this.props.removeBreadCrumb();  
      this.props.history.push("/policy/detail");
    }
  }

  submit = () => {
    this.props.toggleLoader();
    setTimeout(() => {
      this.props.enqueueInformation("連携（オプトイン）が完了しました");
      this.props.toggleLoader();
      this.setState({
        ...this.state,
        submit: true,
      })
      this.props.removeBreadCrumb();
      this.props.history.push("/policy/detail");
    }, 1200);
  }

  return = () => {
    this.props.removeBreadCrumb();
    this.props.history.push("/policy/detail");
  }

  render() {
    const {
      submit
    } = this.state;

    const {
      optin,
    } = this.props;

    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          <h4 className={`${Styles.title} ${Styles.insurancer}`}>電子カルテ</h4>
          <p className={Styles.description}>以下 医師と連携（オプトイン）します</p>
          <ol className={Styles.card_container}>
            {optin.records.map((record) => {
              return (
                <li className={Styles.card}>
                  <img className={Styles.image} src={record.image} alt={record.id} />
                  <div className={Styles.description}>
                    <p>{`${record.hospital} ${record.department} ${record.position}`}</p>
                    <p>{record.doctor}</p>
                  </div>
                </li>
              )
            })}
          </ol>

        </section>
        <section className={Styles.section}>
          {(() => {
            return (
              <React.Fragment>
                <Button className={`${Styles.submit} ${submit ? Styles.hidden : ""}`} variant="contained" color="primary" size="large" onClick={this.submit}>連携</Button>
                <Button color="secondary" className={Styles.cancel} onClick={this.return}>戻る</Button>
              </React.Fragment>
            )
          })()}
        </section>
        <Loader />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    policy: store.policy,
    optin: store.optin,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleLoader() {
      dispatch(toggleLoader());
    },
    removeBreadCrumb() {
      dispatch(removeBreadCrumb(1));
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(optin_confirm);