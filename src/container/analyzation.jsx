import _ from "lodash";
import React, { Component } from 'react';
import { connect } from "react-redux";
import Styles from './style/analyzation.module.scss';
import Card from '../component/card';
import axios from 'axios';
import { Button, Modal } from '@material-ui/core';
import { enqueueBreadCrumb, } from '../module/action/common';
import SectionLoader from '../component/loader_small';
import ReactApexChart from "react-apexcharts";
import { CONNECTION_MENU } from '../common/navigation';
import { API_FOR_POLICY } from '../common/config';
import { CATEGORY_COLOR } from '../common/constant';
import uuid from '../utility/uuid';
import color from "../utility/color";

// stub
import { AnalyzationResult, HealthAnalyzation } from '../common/stub';


class analyzation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analyzation: AnalyzationResult,
      health_analyzation: HealthAnalyzation,
      recomends: {
        state: null,
        data: [],
      },
      connect: false,
    }
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      recomends: {
        ...this.state.recomends,
        state: "request",
        anchorEl: null,
      }
    })
    axios.get(API_FOR_POLICY)
      .then((response) => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            recomends: {
              ...this.state.recomends,
              state: "success",
              data: response.data,
            }
          })
        }, 500);
      })
      .catch((response) => {
        // ToDo: Error Process
      });
  }

  toggleRecomend = (selected) => {
    const editableRecomends = _.cloneDeep(this.state.recomends);
    editableRecomends.data.map((recomend) => {
      if (recomend.id === selected.id) {
        recomend.selected = recomend.selected ? false : true;
      }
    });

    // analyzation
    // ToDo: Dummy Data Set
    const targetCount = editableRecomends.data.filter((recomend) => {
      return recomend.selected === true;
    }).length;

    let editableAnalyzation = _.cloneDeep(this.state.analyzation);
    if (targetCount > 0) {
      if (editableAnalyzation.series.length === 2) {
        editableAnalyzation.series.push({
          name: '選択した保険のご加入後',
          data: [30, 70, 30, 70, 10, 20],
        })
      }
    } else {
      editableAnalyzation.series = editableAnalyzation.series.slice(0, 2);
    }

    this.setState({
      ...this.state,
      recomends: editableRecomends,
      analyzation: editableAnalyzation,
    });
  };


  toggleConnection = () => {
    this.setState({
      ...this.state,
      connect: this.state.connect ? false : true,
    });
  }

  accessToContents = (accessParameter) => {
    this.props.enqueueBreadCrumb(accessParameter);
    this.props.history.push(accessParameter.url)
  };

  render() {
    const {
      analyzation,
      health_analyzation,
      recomends,
      connect,
    } = this.state;

    const {
      base,
    } = this.props.account


    return (
      <div className={Styles.root}>
        <section className={`${Styles.section} ${Styles.flex} ${Styles.row}`}>
            <h3 className={Styles.title}>保険加入状況</h3>
            <div id="analyzation" className={Styles.full_width}>
              <ReactApexChart options={analyzation.options} series={analyzation.series} type="radar" height="300px" />
            </div>
            <h3 className={Styles.title}>健康診断結果</h3>
            <div id="health_analyzation" className={Styles.full_width}>
              <ReactApexChart options={health_analyzation.options} series={health_analyzation.series} type="radar" height="300ppx" />
            </div>
        </section>
        <section className={Styles.section}>
          {(() => {
            if (recomends.state === "request") {
              return (
                <SectionLoader />
              )
            }
          })()}
          <h3 className={Styles.title}>{base.name}様にオススメする保険</h3>
          <div className={Styles.card_container} >
            <div className={Styles.legend}>
              {CATEGORY_COLOR.map((cc) => {
                return (
                  <span color={cc.value}>{cc.key}</span>
                )
              })}
            </div>

            {(() => {
              if (recomends.state === "success") {
                if (recomends.data.length) {
                  recomends.data.sort((a, b) => {
                    return `${a.insurancer} ${a.item_name}` > `${b.insurancer} ${b.item_name}` ? 1 : -1;
                  });
                  return recomends.data.map((res) => {
                    const key = res.id;
                    const card_data = {
                      title: res.insurancer,
                      sub_title: res.item_name,
                      attributes: res.attributes,
                      image: res.image,
                      badge: false,
                      click_action: this.toggleRecomend.bind(this, res),
                      color: color.getCategoryColor(res.category),
                      selected: res.selected,
                    }
                    return (
                      <Card key={uuid.getUuid()} card_data={card_data}/>
                    );
                  })
                } else {
                  return (
                    <p>おすすめはございません</p>
                  )
                }
              }
            })()}
          </div>
          <div className={Styles.action_slot}>
            <Button variant="contained" color="primary" className={Styles.submit} onClick={this.toggleConnection}>
              もっと詳しく知りたい
            </Button>
          </div>
        </section>

        {(() => {
          return (
            <Modal
              open={connect}
              className={Styles.modal}>
              <div className={Styles.contents}>
                <h3 className={Styles.title}>ご相談方法を選択してください</h3>
                {/* <h5 className={Styles.title}>以下の保険証券の取込みを行います。<br/>よろしいですか？</h5> */}
                <section className={`${Styles.section} ${Styles.menu_container}`}>
                  {(() => {
                    return CONNECTION_MENU.map(menu => {
                      return (
                        <div key={menu.id} className={Styles.menu}>
                          <img className={Styles.image} src={menu.image} alt={menu.title} onClick={this.accessToContents.bind(this, menu)} />
                          <p className={Styles.title}>{menu.title}</p>
                        </div>
                      )
                    })
                  })()}
                </section>
                <div className={Styles.actions}>
                  <Button color="secondary" className={Styles.cancel} onClick={this.toggleConnection}>キャンセル</Button>
                </div>
              </div>
            </Modal>
          )
        })()}
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    account: store.account,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    enqueueBreadCrumb(breadcrumb) {
      dispatch(enqueueBreadCrumb(breadcrumb));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(analyzation);