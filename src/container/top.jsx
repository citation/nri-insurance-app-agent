import React, { Component } from 'react';
import { connect } from "react-redux";
import { Carousel } from 'react-responsive-carousel';
import Styles from './style/top.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import { DEFAULT_BREADCRUMB } from '../common/constant';
import { TOP_MENU } from '../common/navigation';
import { setCurrentPage, replaceBreadCrumb, enqueueBreadCrumb, removeInformation, } from '../module/action/common';

//Stub
import {
  NewsInformation
} from '../common/stub';

class top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsInformation: NewsInformation,
    };

    // initialize Breadcrumb
    this.props.replaceBreadCrumb();
  };


  shouldComponentUpdate = (nextProps, nextState) => {
    if(this.state == nextState) {
      return false;
    }
    return true;
  }

  accessToNewsDetail = (value) => {
    const to = this.state.newsInformation[value].url;
    this.props.history.push(to)
  };

  accessToContents = (accessParameter) => {
    this.props.setCurrentPage(accessParameter.key);
    this.props.enqueueBreadCrumb(accessParameter);
    this.props.history.push(accessParameter.url)
  };

  render() {
    return (
      <div className={Styles.root}>
        <section className={`${Styles.section} ${Styles.news_container}`}>
          <Carousel showThumbs={false} autoPlay={true} infiniteLoop={true} onClickItem={this.accessToNewsDetail}>
            {(() => {
              return this.state.newsInformation.map(news => {
                return (
                  <div key={news.id}>
                    <img className={Styles.image} src={news.image} alt={news.title} />
                    {(()=>{
                      if(news.title){
                        return (
                          <p className={Styles.title}>{news.title}</p>
                        )
                      }
                    })()}
                  </div>
                )
              })
            })()}
          </Carousel>
        </section>
        <section className={`${Styles.section} ${Styles.menu_container}`}>
          {(() => {
            return TOP_MENU.map(menu => {
              return (
                <div key={menu.id} className={Styles.menu}>
                  <img className={Styles.image} src={menu.image} alt={menu.title} onClick={this.accessToContents.bind(this, menu)} />
                  <p className={Styles.title}>{menu.title}</p>
                </div>
              )
            })
          })()}
        </section>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    setCurrentPage(page) {
      dispatch(setCurrentPage(page));
    },
    replaceBreadCrumb() {
      dispatch(replaceBreadCrumb([DEFAULT_BREADCRUMB]));
    },
    enqueueBreadCrumb(breadcrumb) {
      dispatch(enqueueBreadCrumb(breadcrumb));
    },
    removeInformation(key) {
      dispatch(removeInformation(key));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(top);