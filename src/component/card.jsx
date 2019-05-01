import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './style/card.module.scss';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';


class card extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      children,
      card_data,
    } = this.props;

    const {
      title,
      sub_title,
      attributes,
      image,
      badge,
      selected,
      click_action,
      color,
    } = card_data;


    return (
      <Card className={`${Styles.root} ${badge ? Styles.badge : ""} ${selected ? Styles.selected : ""}`} 
            onClick={click_action}
            color={color}>
        <CardMedia
          className={Styles.image}
          image={image}
          title={title} />
        <CardContent className={Styles.details}>
          <Typography className={Styles.title}>
            {title}
          </Typography>
          <Typography className={Styles.sub_title}>
            {sub_title}
          </Typography>
          
          <div className={Styles.information}>
            {children}
          </div>
          {/* {(() => {
            if(attributes){
              const tifOptions = Object.keys(attributes).map(key =>
                <Typography className={Styles.description}>
                  {`${key} : ${attributes[key]}`}
                </Typography>
              );
              return tifOptions;
            }
          })()} */}
        </CardContent>
      </Card>
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
)(card);
