import React, { Component } from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import Styles from './account_confirm.module.scss';
import { Button, } from '@material-ui/core';
import Loader from '../component/loader';
import Card from '../component/card';
import { toggleLoader, enqueueInformation } from '../module/action/common'
import uuid from '../utility/uuid';
import decode from '../utility/decode';

// stub
import { AccountCooperates, Account_Information } from '../common/stub'


class account_confirm extends Component {
  constructor(props) {
    super(props);
    const render = this.props.account.id? true: false;
    this.state = {
      open: false,
      render: render,
      submit: false,
    };

    if (!render) {
      this.props.history.push("/account/menu");
    }
  };


  componentDidMount = () => {
    this.setState({
      open: true,
    });
  }

  accessToContents = (url) => {
    this.props.history.push(url);
  };

  submit = () => {
    this.props.toggleLoader();
    // set stub 
    setTimeout(() => {
      this.setState({
        ...this.state,
        submit: true,
      });
      this.props.enqueueInformation("アカウント情報を更新しました")
      this.props.toggleLoader();
    }, 1200);
  }

  render() {
    const {
      open,
      render,
      submit,
    } = this.state;

    const {
      base,
      address,
      cooperate,
    } = this.props.account;
    if (render) {
      return (
        <div className={`${Styles.root} ${open ? Styles.show : Styles.hide}`}>
          <div className={Styles.section}>
            <h3 className={Styles.title}>アカウント情報</h3>
            <section className={Styles.section}>
              <h4 className={Styles.title}>基本情報</h4>
              <ul className={Styles.list}>
                <li className={Styles.item}>
                  <p className={Styles.title}>氏名</p>
                  <p className={Styles.value}>{base.name}</p>
                </li>
                <li className={Styles.item}>
                  <p className={Styles.title}>性別</p>
                  <p className={Styles.value}>{base.gender == "male" ? "男性" : "女性"}</p>
                </li>
                <li className={Styles.item}>
                  <p className={Styles.title}>電話番号</p>
                  <p className={Styles.value}>{base.phone_number}</p>
                </li>
                <li className={Styles.item}>
                  <p className={Styles.title}>Email</p>
                  <p className={Styles.value}>{base.email}</p>
                </li>
              </ul>
            </section>
            <section className={Styles.section}>
              <h4 className={Styles.title}>住所情報</h4>
              <ul className={Styles.list}>
                <li className={Styles.item}>
                  <p className={Styles.title}>郵便番号</p>
                  <p className={Styles.value}>{address.postal_code}</p>
                </li>
                <li className={Styles.item}>
                  <p className={Styles.title}>都道府県</p>
                  <p className={Styles.value}>{decode.getState(address.state)}</p>
                </li>
                <li className={Styles.item}>
                  <p className={Styles.title}>市区郡町村</p>
                  <p className={Styles.value}>{address.city}</p>
                </li>
                <li className={Styles.item}>
                  <p className={Styles.title}>住所1</p>
                  <p className={Styles.value}>{address.address1}</p>
                </li>
                <li className={Styles.item}>
                  <p className={Styles.title}>住所2</p>
                  <p className={Styles.value}>{address.address2}</p>
                </li>
              </ul>
            </section>
            <section className={Styles.section}>
              {(() => {
                if (cooperate.length) {
                  return (
                    <React.Fragment>
                      <h4 className={Styles.title}>外部反映先</h4>
                      <div className={Styles.card_container}>
                        {cooperate.map((cp) => {
                          const card_data = {
                            title: cp.insurancer,
                            sub_title: cp.item_name,
                            description: cp.description,
                            image: cp.image,
                          }
                          return (
                            <Card key={uuid.getUuid()} card_data={card_data} />
                          );
                        })}
                      </div>
                    </React.Fragment>
                  )
                }
              })()}
            </section>
            <section className={Styles.section}>
              <Button variant="contained" color="primary" size="large" className={`${Styles.submit} ${submit ? Styles.hidden : ""}`} onClick={this.submit} >更新</Button>
              <Button color="secondary" className={Styles.cancel} onClick={this.accessToContents.bind(this,submit ? "/account/menu" : "/account/edit")}>戻る</Button>
            </section>
          </div>
          <Loader />
        </div>
      );
    } else {
      return null;
    }
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
)(account_confirm);