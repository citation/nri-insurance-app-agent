import React, { Component } from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import Styles from './style/financial_planner_list.module.scss';
import { Modal, Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import Loader from '../component/loader';
import { toggleLoader, removeBreadCrumb, enqueueInformation } from '../module/action/common'
import { setDoctorsForOptin } from '../module/action/optin';

// stub
import { FinancialPlanners } from '../common/stub'

class financial_planner_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal_fp: null,
      selected_fp: null,
      financial_planners: FinancialPlanners,
    };
  };

  show_modal = (key) => {
    const fps = this.state.financial_planners;
    let fp = fps.filter((record) => {
      return record.id === key;
    });
    fp = fp.length ? fp.shift() : null;

    this.setState({
      ...this.state,
      modal_fp: fp,
    });
  }

  close_modal = (event) => {
    this.setState({
      ...this.state,
      modal_fp: null,
    });
  }

  pickup_fp = (key) => {
    const fps = this.state.financial_planners;
    let fp = fps.filter((record) => {
      return record.id === key;
    });
    fp = fp.length ? fp.shift() : null;
    this.setState({
      ...this.state,
      selected_fp: fp,
      modal_fp: null,
    });
  }

  submit = () => {
    this.props.toggleLoader();
    setTimeout(() => {
      this.props.enqueueInformation("ご相談の予約が完了しました");
      this.props.toggleLoader();
      this.change_view("/analyzation");
    }, 2000);
  }

  change_view = (url) => {
    this.props.history.push(url)
  };

  render() {
    const {
      financial_planners,
      modal_fp,
      selected_fp
    } = this.state;

    const {
      base
    } = this.props.account;

    return (
      <div className={Styles.root}>

        <section className={`${Styles.section} ${Styles.search_result}`}>
          <h3 className={Styles.title}>フィナンシャルプランナー</h3>
          {(() => {
            if (financial_planners.length) {
              if (!selected_fp) {
                return (
                  <React.Fragment>
                    <p className={Styles.description}>3名のが見つかりました</p>
                    <ol className={Styles.card_container}>
                      {financial_planners.map((fp) => {
                        return (
                          <li key={fp.id} className={`${Styles.card} ${fp.selected ? Styles.selected : ""}`} onClick={this.show_modal.bind(this, fp.id)}>
                            <img className={Styles.image} src={fp.image} alt={fp.id} />
                            <div className={Styles.description}>
                              <p>{fp.name}</p>
                              <p>{fp.profile}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ol>
                  </React.Fragment>
                )
              } else {
                return (
                  <ol className={Styles.card_container}>
                    <li key={selected_fp.id} className={`${Styles.card} ${selected_fp.selected ? Styles.selected : ""}`}>
                      <img className={Styles.image} src={selected_fp.image} alt={selected_fp.id} />
                      <div className={Styles.description}>
                        <p>{selected_fp.name}</p>
                        <p>{selected_fp.profile}</p>
                      </div>
                    </li>
                  </ol>
                )
              }
            } else {
              return;
            }
          })()}


          {(() => {
            if (selected_fp) {
              return (
                <ul className={Styles.list}>
                  <li className={`${Styles.item} ${Styles.flex} ${Styles.column}`}>
                    <p className={Styles.title}>相談希望日時</p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <DatePicker
                        className={Styles.item}
                        margin="normal"
                        label="希望日"
                      />
                      <TimePicker
                        className={Styles.item}
                        margin="normal"
                        label="希望時間"
                      />
                    </MuiPickersUtilsProvider>
                  </li>
                  <li className={`${Styles.item} ${Styles.flex} ${Styles.column}`}>
                    <p className={Styles.title}>ご相談内容など</p>
                    <TextField
                      className={Styles.item}
                      multiline={true}
                      rows={3}
                    />
                  </li>
                </ul>
              )
            }
          })()}

          <div className={Styles.action_slot}>
            {(() => {
              if (selected_fp) {
                return (
                  <Button variant="contained" color="primary" className={Styles.submit} onClick={this.submit}>申請する</Button>
                
                )
              }
            })()}
            <Button color="secondary" className={Styles.cancel} onClick={this.return}>戻る</Button>
          </div>
        </section>

        {(() => {
          if (modal_fp) {
            return (
              <Modal
                open={modal_fp ? true : false}
                className={Styles.modal}>
                <div className={Styles.contents}>
                  <img className={Styles.image} src={modal_fp.image} alt="preview" />
                  <ul className={Styles.list}>
                    <li className={Styles.item}>
                      <p className={Styles.title}>氏名</p>
                      <p className={`${Styles.value}`}>{modal_fp.name}</p>
                    </li>
                    <li className={Styles.item}>
                      <p className={Styles.title}>プロフィール</p>
                      <p className={`${Styles.value}`}>{modal_fp.profile}</p>
                    </li>

                    <li className={Styles.item}>
                      <p className={Styles.title}>資格</p>
                      {modal_fp.certifications.map((certification) => {
                        return (
                          <p key={Styles.value} className={`${Styles.value}`}>{certification}</p>
                        )
                      })}
                    </li>
                  </ul>

                  <div className={Styles.actions}>
                    <Button variant="contained" color="primary" size="large" className={Styles.submit} onClick={this.pickup_fp.bind(this, modal_fp.id)}>選択する</Button>
                    <Button color="secondary" className={Styles.cancel} onClick={this.close_modal} >キャンセル</Button>
                  </div>
                </div>
              </Modal>
            )
          }
        })()}
        <Loader />
      </div>
    );
  }
}


const mapStateToProps = store => {
  return {
    account: store.account,
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
    setDoctorsForOptin(records) {
      dispatch(setDoctorsForOptin(records));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(financial_planner_list);