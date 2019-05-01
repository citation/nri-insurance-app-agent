import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './style/personal_card.module.scss';
import {
  Card,
  CardContent,
  Typography,
  Tooltip,
} from '@material-ui/core';
import colorUtil from '../utility/color';
import GroupIcon from '@material-ui/icons/Group';


class personal_card extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const {
      children,
      card_data,
    } = this.props;

    const {
      name,
      age,
      gender,
      policy,
      family,
      badge,
      selected,
      click_action,
      color,
    } = card_data;


    return (
      <Card className={`${Styles.root} ${badge ? Styles.badge : ""} ${selected ? Styles.selected : ""}`} 
            onClick={click_action}
            color={color}>
        <CardContent className={Styles.details}>
          <div className={`${Styles.flex} ${Styles.row} ${Styles.full_width}`}>
            <Typography className={`${Styles.title} ${Styles.half_width}`}>
              {name}
            </Typography>
            <div className={`${Styles.flex} ${Styles.row} ${Styles.half_width}`}>
              <Typography className={`${Styles.sub_title} ${Styles.one_third_width}`}>
                {age}
              </Typography>
              <Typography className={`${Styles.sub_title} ${Styles.one_third_width}`}>
                {gender}
              </Typography>
              <Typography className={`${Styles.sub_title} ${Styles.one_third_width}`}>
                家族：{1 + (family? family.length : 0)}
              </Typography>
              </div>
          </div>
          <div className={`${Styles.flex} ${Styles.row} ${Styles.flex_start} ${Styles.full_width}`}>
            {(() => {
              if (policy) {
                return policy.map(p => {
                  return (
                    <Tooltip title={p.item_name}>
                      <img className={Styles.policy_image} color={colorUtil.getCategoryColor(p.category)} src={p.image}></img>
                    </Tooltip>
                  )
                });
              }
            })()}
          </div>
          
          <div className={Styles.information}>
            {children}
          </div>
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
)(personal_card);
