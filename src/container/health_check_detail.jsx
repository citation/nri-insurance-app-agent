import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './style/health_check_detail.module.scss';
import { enqueueBreadCrumb } from '../module/action/common';
import Loader from '../component/loader_small';
import { Modal, Button, IconButton } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';

// stub
import { HealthCheckFields } from '../common/stub';
import Image from '../common/image/stub/health_check_result.png';


class health_check_detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      api_state: null,
      health_state: HealthCheckFields,
      modal_check_result: false,
    };
  };

  accessToContents = (accessProperties) => {
    const breadcrumb = {
      title: accessProperties.title,
      url: accessProperties.url,
      color: "textPrimary",
    }
    this.props.enqueueBreadCrumb(breadcrumb);
    this.props.history.push(accessProperties.url);
  };

  toggleModalCheckResult = () => {
    this.setState({
      modal_check_result: this.state.modal_check_result? false: true,
    })
  }

  render() {
    const {
      api_state,
      health_state,
      modal_check_result
    } = this.state;

    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          <h3 className={`${Styles.title} ${Styles.insurancer}`}>健康診断結果
            <IconButton color="inherit" aria-label="Account" onClick={this.openAccountMenu}>
                  <ImageIcon color="primary" onClick={this.toggleModalCheckResult} />
            </IconButton>
            <span className={Styles.tittle_side_information}>受診日：{health_state.date}</span>
          </h3>
          {(() => {
            if (api_state === "request") {
              return (
                <Loader />
              )
            }
          })()}
          <ul className={Styles.list}>
            {health_state.result.map((res) => {
              return (
                <li className={Styles.item}>
                  <p className={Styles.title}>{res.name}</p>
                  <p className={`${Styles.value} ${Styles.with_standard}`} data-standard={res.standard}>{res.value ? res.value : "-"}</p>
                  <p className={Styles.opinion}>{res.opinion ? res.opinion : "-"}</p>
                </li>
              )
            })}
          </ul>
        </section>
        {(() => {
          return (
            <Modal
              open={modal_check_result ? true : false}
              onClose={this.toggleModalCheckResult}
              className={Styles.modal}>
              <div className={Styles.contents}>
                <h3 className={Styles.title}>健康診断結果</h3>
                <img className={Styles.image} src={Image} alt="healthcheck" />
              </div>
            </Modal>
          )
        })()}
      </div>
    )
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(health_check_detail);