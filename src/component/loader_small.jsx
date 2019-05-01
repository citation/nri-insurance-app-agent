import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './loader_small.module.scss';

class loader_small extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className={Styles.root}>
        <div className={Styles.loader} ></div>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {}
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(loader_small);



