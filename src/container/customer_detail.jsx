import React, { Component } from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import { Menu, MenuItem, IconButton, TextField, Card as Mtrl_Card, Dialog } from '@material-ui/core';
import Card from '../component/card';
import ConfirmDialog from '../component/confirm_dialog';
import SectionLoader from '../component/loader_small';
import Loader from '../component/loader';
import MenuIcon from '@material-ui/icons/Menu';
import { toggleLoader, enqueueBreadCrumb, enqueueInformation, } from '../module/action/common';
import { setCurrentPolicy } from '../module/action/policy';
import Styles from './style/customer_detail.module.scss';
import uuid from '../utility/uuid';
import color from "../utility/color";
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import { API_FOR_POLICY, API_FOR_RECOMEND } from '../common/config';
import { CATEGORY_COLOR, CONNECTION_STATE_COLOR } from '../common/constant';
import GroupIcon from '@material-ui/icons/Group';
import RemoveIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import CallIcon from '@material-ui/icons/ContactPhone'
import MailIcon from '@material-ui/icons/ContactMail'

// stub
import { AnalyzationResult, HealthAnalyzation } from '../common/stub';

class customer_detail extends Component {
  constructor(props) {
    super(props);
    if (!this.props.customer.id) {
      this.props.history.push("/customer/list");
    }

    this.state = {
      analyzation: AnalyzationResult,
      health_analyzation: HealthAnalyzation,
      policy: {
        state: null,
        data: [],
      },

      recomend: {
        state: null,
        data: [],
      },

      recomend_approach: true,
      confirm: null,
    };
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      policy: {
        ...this.state.policy,
        state: "request",
      }
    });
    // Policy
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
        }, 500);
      })
      .catch((response) => {
        // ToDo: Error Process
      });

    // Recomend
    axios.get(API_FOR_RECOMEND)
      .then((response) => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            recomend: {
              ...this.state.recomend,
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
    this.closeMenu();
  }

  openMenu = event => {
    this.setState({
      ...this.state,
      anchorEl: event.currentTarget
    });
  };

  closeMenu = () => {
    this.setState({
      ...this.state,
      anchorEl: null
    });
  };

  openRecomendMenu = event => {
    this.setState({
      ...this.state,
      anchorEl_recomend: event.currentTarget
    });
  };

  closeRecomendMenu = () => {
    this.setState({
      ...this.state,
      anchorEl_recomend: null
    });
  };

  handleCall = (customer) => {
    const closeAction = this.closeConfirm;
    this.setState({
      ...this.state,
      confirm: {
        open: true,
        title: "確認",
        message: `${customer.name}様に電話をかけます(${customer.phone_number})。よろしいですか？`,
        handleApprove: this.closeConfirm,
        handleClose: this.closeConfirm,
      }
    });
  }

  handleSendMail = (customer) => {
    const closeAction = this.closeConfirm;
    this.setState({
      ...this.state,
      confirm: {
        open: true,
        title: "確認",
        message: `${customer.name}様にメールを送信します(${customer.email})。よろしいですか？`,
        handleApprove: this.closeConfirm,
        handleClose: this.closeConfirm,
      }
    });
  }

  handleDeleteRecomend = (key) => {
    const recomends = _.cloneDeep(this.state.recomend);

    const afterData = recomends.data.filter((recomend)=>{
      return recomend.id !== key;
    });

    afterData.sort((a,b) => {
      return a.insurancer + a.item_name > b.insurancer + b.item_name? 1: -1;
    });

    recomends.data = afterData;
    this.setState({
      ...this.state,
      recomend: recomends,
    })
  }

  closeConfirm = () => {
    this.setState({
      ...this.state,
      confirm: null,
    });
  }

  toggleRecomendApproach = () => {
    this.setState({
      ...this.state,
      recomend_approach: this.state.recomend_approach? false: true,
    });
  }

  saveRecomendApproach = () => {
    this.props.toggleLoader();
    setTimeout(() => {
      this.props.enqueueInformation("分析結果のポイントを更新しました");
      this.props.toggleLoader();
      this.toggleRecomendApproach();
    }, 1500);
  }

  render() {
    const {
      policy,
      recomend,
      anchorEl,
      anchorEl_recomend,
      analyzation,
      health_analyzation,
      confirm,
      recomend_approach,
    } = this.state;

    const {
      customer
    } = this.props;

    if(!customer.id){
      return null;
    }
    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          <h3 className={Styles.title}>{customer.name}様
            <span className={Styles.tittle_side_information}>{`最終更新日：${customer.updated_date}`}</span>
          </h3>

          <ul className={Styles.list}>
            <li className={Styles.item}>
              <p className={Styles.title}>ID</p>
              <p className={Styles.opinion} >{customer.id}</p>
            </li>
            <li className={Styles.item}>
              <p className={Styles.title}>生年月日（満年齢）</p>
              <p className={Styles.opinion} >{customer.birthday}
                <span className={Styles.opinion} >{`（満${customer.age}歳）`}</span>
              </p>
            </li>
            <li className={Styles.item}>
              <p className={Styles.title}>性別</p>
              <p className={Styles.opinion} >{customer.gender}</p>
            </li>

            <li className={Styles.item}>
              <p className={Styles.title}>電話番号</p>
              <p className={Styles.opinion} >{customer.phone_number}</p>
            </li>

            <li className={Styles.item}>
              <p className={Styles.title}>eMail</p>
              <p className={Styles.opinion} >{customer.email}</p>
            </li>

            <li className={Styles.item}>
              <p className={Styles.title}>住所</p>
              <p className={Styles.opinion} >{customer.address.postal_code}</p>
              <p className={Styles.opinion} >{`${customer.address.city} ${customer.address.city} ${customer.address.address1} ${customer.address.address2}`}</p>
            </li>

            <li className={Styles.item}>
              <p className={Styles.title}>家族構成</p>
              {(()=>{
                if(customer.family){
                  return customer.family.map((member,index)=>{
                    return (
                      <p className={Styles.opinion} >{`${index + 1}. ${member.name}`}
                        <span className={Styles.opinion} >{`（${member.type}）${member.birthday}（満${member.age}歳）`}</span>
                      </p>
                    )
                  })
                }else{
                  return (
                    <p className={Styles.opinion} >-</p>
                  )
                }
              })()}
            </li>
          </ul>

          <Mtrl_Card data-title="ご相談依頼" className={`${Styles.actions} ${Styles.fullWidth} ${Styles.flex} ${Styles.row} ${Styles.flex_end} ${Styles.box_padding}`}>
            <div className={Styles.legend}>
              {CONNECTION_STATE_COLOR.map((csc)=>{
                return (
                  <span key={csc.key} color={csc.value} >{csc.key}</span>
                )
              })}
            </div>

            <ul className={Styles.list}>
            {(() => {
              if (customer.connection) {
                return customer.connection.map((cnct, index) => {
                  return (
                    <Mtrl_Card color={color.getConnectionStateColor(cnct.state)} data-title={index + 1} className={`${Styles.action} ${Styles.flex} ${Styles.row}`}>
                      <li className={Styles.item}>
                        <p className={Styles.title}>申請日</p>
                        <p className={Styles.opinion} >{cnct.request_date}</p>
                      </li>
                      <li className={Styles.item}>
                        <p className={Styles.title}>希望日時</p>
                        <p className={Styles.opinion} >{`${cnct.date} ${cnct.time}`}</p>
                      </li>
                    </Mtrl_Card>
                  )
                })
              } else {
                return (
                  <p className={Styles.opinion} >-</p>
                )
              }
              })()}
            </ul>
          </Mtrl_Card>

          <Mtrl_Card data-title="アクション" className={`${Styles.actions} ${Styles.fullWidth} ${Styles.flex} ${Styles.row} ${Styles.flex_end} ${Styles.box_padding}`}>
            <CallIcon color="primary" onClick={this.handleCall.bind(this,customer)} />
            <MailIcon color="primary" onClick={this.handleSendMail.bind(this,customer)} />
          </Mtrl_Card>
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
          < IconButton className={Styles.tittle_side_action} color="primary" onClick={this.openMenu}>
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
        
        <section className={`${Styles.section} ${Styles.flex} ${Styles.row}`}>
        <div className={`${Styles.half_width} ${Styles.sp_full}`}>
            <h3 className={Styles.title}>保険加入状況</h3>
            <div id="analyzation" className={Styles.full_width}>
              <ReactApexChart options={analyzation.options} series={analyzation.series} type="radar" height="300px%" />
            </div>
          </div>
          <div className={`${Styles.half_width} ${Styles.sp_full}`}>
            <h3 className={Styles.title}>健康診断結果</h3>
            <div id="health_analyzation" className={Styles.full_width}>
              <ReactApexChart options={health_analyzation.options} series={health_analyzation.series} type="radar" height="300px" />
            </div>
          </div>
        </section>

        <section className={Styles.section}>
          {(() => {
            if (recomend.state === "request") {
              return (
                <SectionLoader />
              )
            }
          })()}
          <h3 className={Styles.title}>リコメンド
          < IconButton className={Styles.tittle_side_action} color="primary" onClick={this.openRecomendMenu}>
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
            </div>

          {(() => {
            if (recomend.state === "success") {
              if (recomend.data.length) {
                recomend.data.sort((a,b) => {
                  return a.insurancer + a.item_name > b.insurancer + b.item_name? 1: -1;
                });
                return recomend.data.map((res) => {
                  const key = res.id;
                  const card_data = {
                    title: res.insurancer,
                    sub_title: res.item_name,
                    attributes: res.attributes,
                    image: res.image,
                    badge: null,
                    color: color.getCategoryColor(res.category),
                  }
                  return (
                    <Card key={uuid.getUuid()} card_data={card_data}>
                      <RemoveIcon color="secondary" onClick={this.handleDeleteRecomend.bind(this, res.id)} />
                    </Card>
                  );
                })
              } else {
                return (
                  <p>分析によるリコメンドはありません。</p>
                )
              }
            }
          })()}
          </div>
          <div className={Styles.edit_area}>
            <TextField
              disabled={recomend_approach}
              label="ポイント"
              placeholder="分析結果に載せるポイント"
              fullWidth
              multiline={true}
              rows={5}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <div className={`${Styles.edit_tool} ${Styles.full_width} ${Styles.flex} ${Styles.row} ${Styles.flex_end}`}>
              <EditIcon color="primary" onClick={this.toggleRecomendApproach} />
              <SaveIcon color="primary" onClick={this.saveRecomendApproach} />
            </div>
          </div>
        </section>

        {(()=>{
          if(confirm){
            return (
              <ConfirmDialog data={confirm} />
            )
          }
        })()}
        <Menu id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.closeMenu} >
          <MenuItem onClick={this.accessToRegistPolicy.bind(this, "/scan/insurance_policy")}> 保険証券を追加する</MenuItem>
          <MenuItem onClick={this.cooperateOnWithholdingSystem} >保険料を源泉徴収システムへ連携する</MenuItem>
        </Menu>

        <Menu id="recomend-menu"
          anchorEl={anchorEl_recomend}
          open={Boolean(anchorEl_recomend)}
          onClose={this.closeRecomendMenu} >
          <MenuItem onClick={this.accessToRegistPolicy.bind(this, "/scan/insurance_policy")}>リコメンドする保険を追加する</MenuItem>
        </Menu>
        <Loader />
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    account: store.account,
    customer: store.customer
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
)(customer_detail);