import React, { Component } from 'react';
import { connect } from "react-redux";
import { POLICY_MENU } from '../common/navigation';
import Styles from './style/policy_detail.module.scss';
import {
  List, ListItem, ListItemText, Avatar, Divider
} from '@material-ui/core';
import { enqueueBreadCrumb } from '../module/action/common';
import uuid from '../utility/uuid';
import axios from 'axios';
import { API_FOR_POLICY } from '../common/config';
import SectionLoader from '../component/loader_small';


class policy_detail extends Component {
  constructor(props) {
    super(props);
    if (!this.props.policy.current_policy) {
      this.props.history.push("/policy/list");
    }
    this.state = {
      policy: {
        state: null,
        data: [],
      },
      target: this.props.policy.current_policy
    };
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      policy: {
        ...this.state.policy,
        state: "request",
        anchorEl: null,
      }
    })

    const params = {
      id: this.state.target,
    };
    axios.get(API_FOR_POLICY, { params })
      .then((response) => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            policy: {
              ...this.state.policy,
              state: "success",
              data: response.data,
            }
          })
        }, 500);
      })
      .catch((response) => {
        // ToDo: Error Process
      });
  }


  accessToContents = (accessProperties) => {
    const breadcrumb = {
      title: accessProperties.title,
      url: accessProperties.url,
      color: "textPrimary",
    }
    this.props.enqueueBreadCrumb(breadcrumb);
    this.props.history.push(accessProperties.url);
  };

  render() {
    const {
      policy,
    } = this.state;

    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          {(() => {
            if (policy.state === "request") {
              return (
                <SectionLoader />
              )
            }
          })()}
          {policy.data.map((res) => {
            return (
              <React.Fragment key={res.id}>
                <h3 className={`${Styles.title} ${Styles.insurancer}`}>{res.insurancer}</h3>
                <h5 className={`${Styles.title} ${Styles.item_name}`}>{res.item_name}</h5>
                <ul className={Styles.list}>
                  <li className={Styles.item}>
                    <p className={Styles.title}>証券番号</p>
                    <p className={Styles.value}>{res.contract ? res.contract.policy_number : ""}</p>
                  </li>
                  <li className={Styles.item}>
                    <p className={Styles.title}>保険契約者</p>
                    <p className={Styles.value}>{res.contract ? res.contract.policy_holders : ""}</p>
                  </li>
                  <li className={Styles.item}>
                    <p className={Styles.title}>被保険者</p>
                    <p className={Styles.value}>{res.contract ? res.contract.insuranced.name : ""}</p>
                  </li>
                  <li className={Styles.item}>
                    <p className={Styles.title}>受取人等（死亡保険金受取金）</p>
                    <p className={Styles.value}>{res.contract ? res.contract.beneficiary : ""}</p>
                  </li>
                  <li className={Styles.item}>
                    <p className={Styles.title}>契約日（始期）</p>
                    <p className={Styles.value}>{res.contract ? res.contract.contract_date : ""}</p>
                  </li>
                  <li className={Styles.item}>
                    <p className={Styles.title}>主契約の保険期間</p>
                    <p className={Styles.value}>{res.contract ? res.contract.period : ""}</p>
                  </li>
                  <li className={Styles.item}>
                    <p className={Styles.title}>主契約の保険料払込期間</p>
                    <p className={Styles.value}>{res.contract ? res.contract.payment_period : ""}</p>
                  </li>
                  <li className={Styles.item}>
                    <p className={Styles.title}>保険金払込方法</p>
                    <p className={Styles.value}>{res.contract ? res.contract.payment_way : ""}</p>
                  </li>
                </ul>


                <h3 className={`${Styles.title} ${Styles.insurancer}`}>お手続き</h3>
                {(() => {
                  if (res.badge) {
                    let notification = "";
                    switch (res.badge) {
                      case "SCAN_MEDICAL_CERTIFICATE": {
                        notification = "ご請求が可能な連携情報（オプトイン）があります"
                        break;
                      }
                      case "CHANGE_PAYMENT_WAY": {
                        notification = "保険金のご入金が確認できておりません"
                        break;
                      }
                      default: {
                        return null;
                      }
                    }
                    return (
                      <h5 className={`${Styles.title} ${Styles.notification}`}>{notification}</h5>
                    )
                  } else {
                    return null;
                  }
                })()}
                <List className={Styles.procedures}>
                  {POLICY_MENU.map(menu => {
                    const badge = res.badge == menu.key;
                    if (res.badge == menu.key && menu.key == "CHANGE_PAYMENT_WAY") {
                      menu.title = "未払保険料のお支払い";
                      menu.sub_title = "未払保険料のお支払いをします";
                    } else if (menu.key == "CHANGE_PAYMENT_WAY") {
                      menu.title = "お支払い方法の変更";
                      menu.sub_title = "保険料のお支払い方法を変更します";
                    }

                    return (
                      <React.Fragment key={uuid.getUuid()} >
                        <ListItem className={`${Styles.procedure} ${badge ? Styles.badge : ""}`} onClick={this.accessToContents.bind(this, menu)} >
                          <Avatar>
                            <img className={Styles.image} src={menu.icon} alt="procedur" />
                          </Avatar>
                          <ListItemText className={Styles.label}
                            primary={menu.title}
                            secondary={menu.sub_title} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    )
                  })}
                </List>
              </React.Fragment>
            )
          })}
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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(policy_detail);