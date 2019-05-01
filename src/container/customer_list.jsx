import React, { Component } from 'react';
import { connect } from "react-redux";
import { MenuItem, IconButton, TextField, Divider, Checkbox, FormControl, FormControlLabel, InputLabel, Select, Modal } from '@material-ui/core';
import Card from '../component/personal_card';
import SectionLoader from '../component/loader_small';
import Loader from '../component/loader';
import SearchIcon from '@material-ui/icons/Search';
import { toggleLoader, enqueueBreadCrumb, enqueueInformation, } from '../module/action/common';
import { setCurrent } from '../module/action/customer';
import Styles from './style/customer_list.module.scss';
import color from "../utility/color";
import axios from 'axios';
import { API_FOR_POLICY } from '../common/config';
import { CATEGORY_COLOR } from '../common/constant';
import GroupIcon from '@material-ui/icons/Group';
import UpIcon from '@material-ui/icons/KeyboardArrowUpOutlined'
import DownIcon from '@material-ui/icons/KeyboardArrowDown'

// stub
import { CustomerList } from '../common/stub';

class customer_list extends Component {
  constructor(props) {
    super(props);
    this.state = {
      condition: {
        open: true,
        state: null,
      },
      result: CustomerList,
      connection: false,
    };
  };

  search = () => {
    this.setState({
      ...this.state,
      condition: {
        ...this.state.condition,
        state: "request",
      }
    });
    axios.get(API_FOR_POLICY)
      .then((response) => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            condition: {
              ...this.state.condition,
              state: "success",
            }
          })
        }, 500);
      })
      .catch((response) => {
        // ToDo: Error Process
      });
  }


  changeConditionCategory = (key) => {
    this.setState({
      ...this.state,
      condition: {
        ...this.state.condition,
        [key]: this.state.condition[key]? null: key,
      }
    })
  }

  changeConditionGender = (event) => {
    this.setState({
      ...this.state,
      condition: {
        ...this.state.condition,
        gender: event.target.value,
      }
    })
  }

  toggleConditionArea = () => {
    this.setState({
      ...this.state,
      condition: {
        ...this.state.condition,
        open: this.state.condition.open ? false : true,
      },
    })
  }

  openConnectionDetail = (id) => {
    this.setState({
      ...this.state,
      connection: id,
    })
  }

  closeConnectionDetail = () => {
    this.setState({
      ...this.state,
      connection: false,
    })
  }

  setCurrentCustomer = (data) => {
    const breadcrumb = {
      title: data.name,
      url: "/customer/detail",
      color: "textPrimary",
    }
    this.props.enqueueBreadCrumb(breadcrumb);
    this.props.setCurrentCustomer(data);
    this.props.history.push("/customer/detail");
  }

  render() {
    const {
      condition,
      connection,
      result,
    } = this.state;

    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          <h3 className={Styles.title}>顧客一覧
            <IconButton className={Styles.tittle_side_action} color="primary" onClick={this.toggleConditionArea}>
              {(() => {
                if (condition.open) {
                  return <UpIcon />
                } else {
                  return <DownIcon />
                }
              })()}
            </IconButton>
          </h3>

          <div className={`${Styles.full_width} ${Styles.flex} ${Styles.column}`}>
            <form noValidate autoComplete="off" className={`${Styles.full_width} ${Styles.form} ${condition.open ? "" : Styles.close}`}>
              <TextField
                id="standard-name"
                label="顧客名"
                // value={this.state.name}
                // onChange={this.handleChange('name')}
                className={Styles.full_width}
                margin="normal"
              />

              <FormControl className={Styles.half_width}>
                <InputLabel htmlFor="gender-condition">性別</InputLabel>
                <Select
                  value={condition.gender? condition.gender: ""}
                  onChange={this.changeConditionGender}
                  inputProps={{
                    name: 'gender',
                    id: 'gender-condition',
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"man"}>男性</MenuItem>
                  <MenuItem value={"Woman"}>女性</MenuItem>
                </Select>
              </FormControl>

              <FormControlLabel
                className={Styles.half_width}
                control={
                  <Checkbox
                    color="primary"
                  // checked={this.state.checkedF}
                  // onChange={this.handleChange('checkedF')}
                  // value="checkedA"
                  // indeterminate
                  />
                }
                label="相談申請"
              />

              <div className={`${Styles.flex} ${Styles.row} ${Styles.full_width} ${Styles.switch_container} `} >
                {CATEGORY_COLOR.map((cc) => {
                  return (
                    <span className={`${Styles.switch} ${this.state.condition[cc.key]? Styles.selected : ""}`} key={cc.key} color={cc.value} onClick={this.changeConditionCategory.bind(this,cc.key)}>{cc.key}</span>
                  )
                })}
              </div>

              <div className={`${Styles.flex} ${Styles.row} ${Styles.full_width} ${Styles.flex_end} `} >
                <IconButton color="primary" onClick={this.search}>
                  <SearchIcon />
                </IconButton>
              </div>
            </form>
          </div>
          </section>

          <Divider />

          <section className={`${Styles.section} ${Styles.search_result}`}>
          <div className={Styles.card_container} >
            {(() => {
              if (condition.state === "request") {
                return (
                  <SectionLoader />
                )
              }
            })()}
            {(() => {
              if (condition.state === "success") {
                return (
                  <p className={Styles.search_result_num}>検索条件に{result.length}名の顧客が該当しました。</p>
                )
              }
            })()}
            {(() => {
              if (condition.state === "success") {
                return result.map((res) => {
                  const key = res.id;
                  const card_data = {
                    name: res.name,
                    gender: res.gender,
                    age: `${res.age} 歳`,
                    policy: res.policy,
                    family: res.family,
                    badge: res.badge,
                    click_action: this.setCurrentCustomer.bind(this, res),
                    color: color.getCategoryColor(res.category),
                  }
                  return (
                    <Card key={key} card_data={card_data}>
                      {(() => {
                        if (res.connection && res.connection.length) {
                          return (
                            <GroupIcon onClick={this.openConnectionDetail.bind(this,key)} />
                          )
                        }
                      })()}
                    </Card>
                  );
                })
              } else {
                return null;
              }
            })()}
          </div>
        </section>


        {(() => {
          return (
            <Modal
              open={connection}
              onClose={this.closeConnectionDetail}
              className={Styles.modal}>
              <div className={Styles.contents}>
                <h3 className={Styles.title}>相談希望申請日</h3>
                <section className={`${Styles.section} ${Styles.menu_container}`}>
                  {(() => {
                    let target = result.filter((customer)=>{
                      return customer.id === connection;
                    });
                    target = target? target.shift(): [];

                    if(target && target.connection){
                      return target.connection.map(connect => {
                        return (
                            <p className={Styles.title}>{`${connect.date} ${connect.time}`}</p>
                        )
                      })
                    }
                  })()}
                </section>
              </div>
            </Modal>
          )
        })()}

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
    setCurrentCustomer(data) {
      dispatch(setCurrent(data));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(customer_list);