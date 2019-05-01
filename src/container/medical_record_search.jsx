import React, { Component } from 'react';
import _ from "lodash";
import { connect } from "react-redux";
import Styles from './style/medical_record_search.module.scss';
import {
  Button, TextField, IconButton
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Loader from '../component/loader';
import { toggleLoader, removeBreadCrumb } from '../module/action/common' 
import { setDoctorsForOptin } from '../module/action/optin';

// stub
import { DoctorsForMedicalRecords } from '../common/stub'

class medical_record_search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medical_records: [],
    };
  };

  accessToContents = (url) => {
    this.props.history.push(url);
  };

  search = () => {
    this.props.toggleLoader();
    // set stub 
    setTimeout(() => {
      this.setState({
        ...this.state,
        medical_records: DoctorsForMedicalRecords,
      });
      this.props.toggleLoader();
    }, 1200);
  }

  pickupDoctor = (key) => {
    const medical_records = _.cloneDeep(this.state.medical_records);
    medical_records.map((record) => {
      if (record.id == key) {
        record.selected = record.selected ? false : true;
      }
    });
    this.setState({
      ...this.state,
      medical_records: medical_records,
    });
  }

  submit = () => {
    const medical_records = _.cloneDeep(this.state.medical_records);
    const choose_records = medical_records.filter((record)=>{
      return record.selected;
    });
    this.props.setDoctorsForOptin(choose_records);
    this.accessToContents("/optin/confirm")
  }

  return = () => {
    this.props.removeBreadCrumb();
    this.props.history.push("/policy/detail");
  }

  render() {
    const {
      medical_records
    } = this.state;

    const records = _.cloneDeep(medical_records);
    const choose_records = records.filter((record)=>{
      return record.selected;
    });

    return (
      <div className={Styles.root}>
        <section className={Styles.section}>
          <h4 className={`${Styles.title} ${Styles.insurancer}`}>電子カルテ</h4>
          <p className={Styles.description}>連携（オプトイン）する病院・医師を検索してください</p>
          <div className={Styles.form}>
            <TextField fullWidth className={Styles.search_text} required label="" defaultValue={""} placeholder="NRI病院 / 保険 太郎" />
            <IconButton className={Styles.search_button} aria-label="Search" onClick={this.search}>
              <SearchIcon />
            </IconButton>
          </div>
        </section>
        <section className={`${Styles.section} ${Styles.search_result}`}>
          {(() => {
            if (medical_records.length) {
              return (
                <React.Fragment>
                  <p className={Styles.description}>3名の医師が見つかりました</p>
                  <ol className={Styles.card_container}>
                    {medical_records.map((record) => {
                      return (
                        <li className={`${Styles.card} ${record.selected ? Styles.selected : ""}`} onClick={this.pickupDoctor.bind(this, record.id)}>
                          <img className={Styles.image} src={record.image} alt={record.id} />
                          <div className={Styles.description}>
                            <p>{`${record.hospital} ${record.department} ${record.position}`}</p>
                            <p>{record.doctor}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ol>
                  <Button color="secondary" className={Styles.cancel}>もっと表示する</Button>
                </React.Fragment>
              )
            } else {
              return;
            }
          })()}
        </section>
        <section className={Styles.section}>
          <Button variant="contained" disabled={choose_records.length? false: true} color="primary" size="large" className={Styles.submit} onClick={this.submit}>確認</Button>
          <Button color="secondary" className={Styles.cancel} onClick={this.return}>戻る</Button>
        </section>
        <Loader/>
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
    removeBreadCrumb() {
      dispatch(removeBreadCrumb(1));
    },
    setDoctorsForOptin(records) {
      dispatch(setDoctorsForOptin(records));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(medical_record_search);