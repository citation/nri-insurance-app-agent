import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './style/confirm_dialog.module.scss';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@material-ui/core';

class confirm_dialog extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      data,
    } = this.props;

    return (
      <Dialog
      open={data.open}
      onClose={this.handleClose}
      aria-labelledby="confirm-dialog"
      aria-describedby="confirm-dialog-description"
    >
      <DialogTitle id="confirm-dialog">{data.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {data.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={data.handleApprove} color="primary">
          Cancel
        </Button>
        <Button onClick={data.handleClose} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {}
};

const mapStateToProps = state => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(confirm_dialog);
