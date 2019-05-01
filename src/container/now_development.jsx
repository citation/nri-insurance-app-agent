import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './style/now_development.module..scss';
import { Button, } from '@material-ui/core';
import { toggleLoader, setCurrentPage } from '../module/action/common'

class now_development extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  };

  componentDidMount = () => {
    this.setState({
      open: true,
    });
  }

  accessToContents = (url) => {
    this.props.setCurrentPage("TOP");
    this.setState({
      open: false,
    });
    this.props.history.push(url);
  };


  render() {
    const {
      open
    } = this.state;

    return (
      <div className={`${Styles.root} ${open ? Styles.show : Styles.hide}`}>
        <section className={Styles.section}>
          <p className={Styles.large_message}>Now Development</p>
          <Button color="secondary" cclassName={Styles.cancel} onClick={this.accessToContents.bind(this,"/")}>戻る</Button>
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
    toggleLoader() {
      dispatch(toggleLoader());
    },
    setCurrentPage(page) {
      dispatch(setCurrentPage(page));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(now_development);