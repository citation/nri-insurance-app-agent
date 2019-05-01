
import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './style/scan_insurance_policy.module.scss';
import { Modal, Button } from '@material-ui/core';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import background from '../common/image/scan/background.png'
import { toggleLoader, enqueueInformation } from '../module/action/common'
import Loader from '../component/loader';

class scan_insurance_policy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  };

  // setRef = webcam => {
  //   this.webcam = webcam;
  // };

  // capture = () => {
  //   const imageSrc = this.webcam.getScreenshot();
  // };

  componentDidMount = () => {
    this.setState({
      open: true,
    });
    var event = new Event('click');
    document.querySelector("#webcam").dispatchEvent(event);
  }

  accessToContents = (url) => {
    this.setState({
      open: false,
      image: null,
    });
    this.props.history.push(url);
  };


  takePhoto = (event) => {
    const file = event.target.files[0];
    const createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;
    this.setState({
      ...this.state,
      image: createObjectURL(file),
    });
  }

  close = (event) => {
    this.setState({
      ...this.state,
      image: null,
    });
  }

  submit = () => {
    this.props.toggleLoader();
    // set stub 
    setTimeout(() => {
      this.setState({
        ...this.state,
        submit: true,
      });
      this.props.enqueueInformation("保険証券の取込みが完了しました。");
      this.props.toggleLoader();
    }, 1200);

    setTimeout(() => {
      this.props.history.push("/customer/detail");
    }, 2000);
  }

  render() {
    const {
      open
    } = this.state;

    return (
      <div className={`${Styles.root} ${open ? Styles.show : Styles.hide}`}>
        <section className={Styles.section}>
          <img src={background} className={Styles.background} alt={"scanMedicalCertificate"} />
          <div className={Styles.actions}>
            <input id="webcam" type="file" accept="image/*" className={Styles.webcam} onChange={this.takePhoto} />
            <label htmlFor="webcam">
              <CameraAltIcon className={Styles.action} />
            </label>
          </div>
        </section>
        {(() => {
          return (
            <Modal
              open={this.state.image ? true : false}
              className={Styles.modal}>
              <div className={Styles.contents}>
                <h3 className={Styles.title}>保険証券の取込み確認</h3>
                <h5 className={Styles.title}>以下の保険証券の取込みを行います。<br/>よろしいですか？</h5>
                <img className={Styles.image} src={this.state.image} alt="preview" />
                <div className={Styles.actions}>
                  <Button variant="contained" color="primary" size="large" className={Styles.submit} onClick={this.submit}>取込む</Button>
                  <Button color="secondary" className={Styles.cancel} onClick={this.close} >キャンセル</Button>
                </div>
              </div>
            </Modal>
          )
        })()}
        <Loader />
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
)(scan_insurance_policy);