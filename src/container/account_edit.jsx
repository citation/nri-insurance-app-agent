import React, { Component } from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import Styles from './account_edit.module.scss';
import {
  Button, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText
} from '@material-ui/core';
import Loader from '../component/loader';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import Card from '../component/card';
import uuid from '../utility/uuid';
import { state_data } from '../utility/decode';
import { putAccountInformation } from '../module/action/account'
import { enqueueInformation,} from '../module/action/common';

// stub
import { Account_Information } from '../common/stub'


class account_edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      account: Account_Information,
    };
  };

  shouldComponentUpdate = (nextProps, NextState) => {
    return true;
  }

  componentDidMount = () => {
    this.setState({
      open: true,
    });
  }

  accessToContents = (url) => {
    this.props.history.push(url);
  };

  selectCooperate = (id) => {
    const account_cooperate = _.cloneDeep(this.state.account_cooperate);
    account_cooperate.map((cooperate) => {
      if (cooperate.id === id) {
        cooperate.selected = cooperate.selected ? false : true;
      }
    });
    this.setState({
      ...this.state,
      account_cooperate: account_cooperate,
    });
  }

  changeBirthday = (value) => {
    this.setState({
      ...this.state,
      account: {
        ...this.state.account,
        birthday: value,
      }
    });
  }

  changeSelector = (event) => {
    const target = event.target;
    this.setState({
      ...this.state,
      account: {
        ...this.state.account,
        [target.name]: target.value,
      }
    });
  }

  changeBaseData = (event) => {
    const tartget = event.target;
    this.setState({
      ...this.state,
      account: {
        ...this.state.account,
        base: {
          ...this.state.account.base,
          [tartget.getAttribute("name")]: tartget.value,
          [`${tartget.getAttribute("name")}_error`]: (tartget.hasAttribute("required") && !tartget.value) ? "入力してください" : null,
        }
      }
    })
  }

  changeAddressData = (event) => {
    const tartget = event.target;
    this.setState({
      ...this.state,
      account: {
        ...this.state.account,
        address: {
          ...this.state.account.address,
          [tartget.getAttribute("name")]: tartget.value,
          [`${tartget.getAttribute("name")}_error`]: (tartget.hasAttribute("required") && !tartget.value) ? "入力してください" : null,
        }
      }
    })
  }

  submit = () => {
    const form = document.querySelector("#form"); 
    if(form.checkValidity()){
      this.props.putAccountInformation(this.state.account);
      this.props.history.push("/account/confirm");
    }else{
      this.props.enqueueInformation("入力不備があります");
    }
  }

  render() {
    const {
      open,
      account,
      account_cooperate,
    } = this.state;

    const {
      base,
      address,
    } = account;

    return (
      <div className={`${Styles.root} ${open ? Styles.show : Styles.hide}`}>
        <div className={Styles.section}>
          <h3 className={`${Styles.title} ${Styles.insurancer}`}>アカウント情報</h3>
          <form id="form">
            <section className={Styles.section}>
              <h4 className={`${Styles.title} ${Styles.insurancer}`}>基本情報</h4>
              <TextField fullwidth="true"
                className={Styles.form}
                required
                label="氏名"
                defaultValue={base.name}
                placeholder="保険 太郎"
                helperText={base.name_error}
                error={base.name_error ? true : ""}
                name="name"
                onChange={this.changeBaseData} />
              <TextField fullwidth="true"
                className={Styles.form}
                label="電話番号"
                defaultValue={base.phone_number}
                placeholder="09012345678"
                helperText={base.phone_number_error}
                error={base.phone_number_error ? true : ""}
                name="phone_number"
                onChange={this.changeBaseData}/>
              <TextField fullwidth="true"
                className={Styles.form}
                label="E-Mail"
                defaultValue={base.email}
                placeholder="taro@nri.com"
                helperText={base.email_error}
                error={base.email_error ? true : ""}
                name="email"
                onChange={this.changeBaseData}
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$" />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DatePicker required
                  className={Styles.form}
                  label="生年月日"
                  fullwidth="true"
                  onChange={this.changeBirthday}
                  value={base.birthday}
                  helperText={base.birthday_error}
                  error={base.birthday_error ? true : ""}/>
              </MuiPickersUtilsProvider>
              <FormControl required
                fullwidth="true"
                className={Styles.form}
                error={base.birthday_error ? true : ""} >
                <InputLabel
                  shrink
                  htmlFor="gender">性別</InputLabel>
                <Select id="gender"
                  displayEmpty
                  required
                  name="gender"
                  fullwidth="true"
                  value={base.gender}
                  onChange={this.changeSelector}>
                  <MenuItem value={"male"}>男</MenuItem>
                  <MenuItem value={"female"}>女</MenuItem>
                </Select>
                <FormHelperText>{base.gender_error}</FormHelperText>
              </FormControl>
            </section>
            <section className={Styles.section}>
              <h4 className={`${Styles.title} ${Styles.insurancer}`}>住所情報</h4>
              <TextField fullwidth="true"
                className={Styles.form}
                required
                label="郵便番号"
                defaultValue={address.postal_code}
                placeholder="0001234"
                name="postal_code"
                helperText={address.postal_code_error}
                error={address.postal_code_error ? true : ""}
                onChange={this.changeAddressData} />
              <FormControl required fullwidth="true" className={Styles.form}>
                <InputLabel fullwidth="true" shrink htmlFor="state">都道府県</InputLabel>
                <Select id="state"
                  required
                  displayEmpty
                  name="state"
                  fullwidth="true"
                  value={address.state}
                  onChange={this.changeSelector}>
                  {(()=>{
                    return state_data.map(state => {
                      return(
                        <MenuItem value={state.code}>{state.name}</MenuItem>
                      )
                    })
                  })()}
                </Select>
              </FormControl>
              <TextField fullwidth="true"
                className={Styles.form}
                required
                label="市区郡町村"
                defaultValue={address.city}
                placeholder="中央区"
                name="city"
                helperText={address.city_error}
                error={address.city_error ? true : ""}
                onChange={this.changeAddressData} />
              <TextField className={Styles.form}
                fullwidth="true"
                required label="住所１"
                multiline
                rowsMax="2"
                defaultValue={address.address1}
                placeholder="◯◯ １丁目2番地3号"
                name="address1"
                helperText={address.address1_error}
                error={address.address1_error ? true : ""}
                onChange={this.changeAddressData} />
              <TextField className={Styles.form} fullwidth="true" label="住所２" multiline rowsMax="2" defaultValue={address.address2} placeholder="ミッドナイトタワー 33F" />
            </section>
            </form>
          <section className={Styles.section}>
            <Button variant="contained" color="primary" size="large" className={Styles.submit} onClick={this.submit}>確認</Button>
            <Button color="secondary" className={Styles.cancel}>戻る</Button>
          </section>
        </div>
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
    putAccountInformation(account) {
      dispatch(putAccountInformation(account));
    },
    enqueueInformation(message) {
      const duration = 2000;
      const snackMessage = {
        message: message,
        options: {
          variant: 'error',
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
)(account_edit);