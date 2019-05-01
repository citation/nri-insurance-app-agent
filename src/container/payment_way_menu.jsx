import React, { Component } from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import Styles from './style/payment_way_menu.module.scss';
import { Button } from '@material-ui/core';
import Card from '../component/card';
import Loader from '../component/loader';
import Notifier from '../component/notifier';
import { enqueueInformation, toggleLoader, removeBreadCrumb } from '../module/action/common'
import uuid from '../utility/uuid';
import { PAYMENT_WAY_MENU } from '../common/navigation';

class payment_way_menu extends Component {
  constructor(props) {
    super(props);

    // state
    this.state = {
    };
  };

  submit = () => {
    this.props.toggleLoader();
    setTimeout(() => {
      this.props.enqueueInformation("連携（オプトイン）が完了しました");
      this.props.toggleLoader();
      this.setState({
        ...this.state,
        submit: true,
      })
    }, 1200);
  }

  return = () => {
    this.props.history.push("/policy/detail");
  }

  render() {
    
    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          <h4 className={`${Styles.title} ${Styles.insurancer}`}>お支払い方法選択</h4>
          <p className={Styles.description}>未払いの保険料金をポイント、もしくはクレジットカードでお支払いすることができます</p>


          <div className={Styles.card_container}>
            {PAYMENT_WAY_MENU.map((menu) => {
              const card_data = {
                title: menu.title,
                sub_title: menu.sub_title,
                image: menu.image,
                // click_action: this.setCurrentPolicy.bind(this,policy_number),
              }
              return (
                <Card key={uuid.getUuid()} card_data={card_data} />
              );
            })}
          </div>

        </section>
        <section className={Styles.section}>
          {(() => {
            return (
              <React.Fragment>
                <Button color="secondary" className={Styles.cancel} onClick={this.return}>戻る</Button>
              </React.Fragment>
            )
          })()}
        </section>
        <Loader />
        <Notifier />
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
)(payment_way_menu);