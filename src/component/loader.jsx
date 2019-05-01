import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './loader.module.scss';

class loader extends Component {
  constructor(props) {
    super(props);
  };

  shouldComponentUpdate = (nextProps, NextState) => {
    if(nextProps.loader == this.props.loader){
      return false;
    }
    return true;
  }

  render() {
    if(this.props.loader){
    return (
      <div className={Styles.root}>
        <div className={Styles.loader} ></div>
      </div>
    );
    }else{
      return null;
    }
  }
}

const mapStateToProps = store => {
  return {
    loader: store.common.loader,
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(loader);



