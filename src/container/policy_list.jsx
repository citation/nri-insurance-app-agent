import React, { Component } from 'react';
import { connect } from "react-redux";
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import Card from '../component/card';
import SectionLoader from '../component/loader_small';
import Loader from '../component/loader';
import MenuIcon from '@material-ui/icons/Menu';
import { toggleLoader, enqueueBreadCrumb, enqueueInformation, } from '../module/action/common';
import { setCurrentPolicy } from '../module/action/policy';
import Styles from './style/policy_list.module.scss';
import uuid from '../utility/uuid';
import color from "../utility/color";
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import { API_FOR_POLICY } from '../common/config';
import { CATEGORY_COLOR } from '../common/constant';
import GroupIcon from '@material-ui/icons/Group';

// stub
import { AnalyzationResult } from '../common/stub';

class policy_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policy: {
        state: null,
        data: [],
      },
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
    });
    axios.get(API_FOR_POLICY)
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
          const reminds = response.data.filter((policy) => {
            return policy.badge;
          })
          if (reminds.length > 0) {
            this.props.enqueueInformation("お知らせがあります[加入保険一覧] ");
          }
        }, 500);
      })
      .catch((response) => {
        // ToDo: Error Process
      });
  }

  setCurrentPolicy = (key) => {
    const target = this.state.policy.data.filter((policy) => {
      return (policy.id == key);
    });
    const policy = target.length ? target.shift() : {};
    const breadcrumb = {
      title: policy.item_name,
      url: "/policy/detail",
      color: "textPrimary",
    }
    this.props.enqueueBreadCrumb(breadcrumb);
    this.props.setCurrentPolicy(key);
    this.props.history.push("/policy/detail");
  }

  accessToRegistPolicy = (url) => {
    const breadcrumb = {
      title: "保険証券追加（個人）",
      url: "/scan/insurance_policy",
      color: "textPrimary",
    }
    this.props.enqueueBreadCrumb(breadcrumb);
    this.props.setCurrentPolicy("");
    this.props.history.push(url);
    this.setState({
      ...this.state,
      open: false,
    });
  };

  cooperateOnWorkSite = () => {
    this.props.toggleLoader();
    setTimeout(() => {
      this.props.enqueueInformation("職域加入の保険情報取込みが完了しました。");
      this.props.toggleLoader();
    }, 2000);
  }

  cooperateOnWithholdingSystem = () => {
    this.props.toggleLoader();
    setTimeout(() => {
      this.props.enqueueInformation("個人加入の保険料を源泉徴収システムへ連携しました。");
      this.props.toggleLoader();
    }, 2000);
    this.closeContactMenu();
  }

  openContactMenu = event => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget
    });
  };

  closeContactMenu = () => {
    this.setState({
      ...this.state,
      anchorEl: null
    });
  };

  render() {
    const {
      policy,
      anchorEl,
    } = this.state;

    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          <h3 className={Styles.title}>保険加入状況</h3>
          <div>
            <ReactApexChart options={AnalyzationResult.options} series={AnalyzationResult.series} type="radar" height="300" />
          </div>
        </section>

        <section className={Styles.section}>
          {(() => {
            if (policy.state === "request") {
              return (
                <SectionLoader />
              )
            }
          })()}
          <h3 className={Styles.title}>保険証券一覧
          < IconButton className={Styles.tittle_side_action} color="primary" onClick={this.openContactMenu}>
              <MenuIcon />
            </IconButton>
          </h3>
          <div className={Styles.card_container} >
            <div className={Styles.legend}>
              {CATEGORY_COLOR.map((cc)=>{
                return (
                  <span key={cc.key} color={cc.value}>{cc.key}</span>
                )
              })}
              <span><GroupIcon/>職域加入保険</span>
            </div>

          {(() => {
            if (policy.state === "success") {
              if (policy.data.length) {
                policy.data.sort((a,b) => {
                  return a.insurancer + a.item_name > b.insurancer + b.item_name? 1: -1;
                });
                return policy.data.map((res) => {
                  const key = res.id;
                  const card_data = {
                    title: res.insurancer,
                    sub_title: res.item_name,
                    attributes: res.attributes,
                    image: res.image,
                    badge: res.badge,
                    click_action: this.setCurrentPolicy.bind(this, key),
                    color: color.getCategoryColor(res.category),
                  }
                  return (
                    <Card key={uuid.getUuid()} card_data={card_data}>
                      {(()=>{
                        if(res.worksite){
                          return (
                            <GroupIcon />
                          )
                        }
                      })()}
                    </Card>
                  );
                })
              } else {
                return (
                  <p>ご加入されていません</p>
                )
              }
            }
          })()}
          </div>
        </section>

        <Menu id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeContactMenu} >
          <MenuItem onClick={this.accessToRegistPolicy.bind(this, "/scan/insurance_policy")}> 保険証券を追加する</MenuItem>
          <MenuItem onClick={this.cooperateOnWithholdingSystem} >保険料を源泉徴収システムへ連携する</MenuItem>
        </Menu>

        <Loader />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    account: state.account,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleLoader() {
      dispatch(toggleLoader());
    },
    enqueueBreadCrumb(breadcrumb) {
      dispatch(enqueueBreadCrumb(breadcrumb));
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
    setCurrentPolicy(key) {
      dispatch(setCurrentPolicy(key));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(policy_list);