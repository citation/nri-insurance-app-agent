import React, {
  Component
} from 'react';
import {
  connect
} from "react-redux";
import {
  BrowserRouter,
} from 'react-router-dom';
import Router from './router';
import Header from './component/header';
import Footer from './component/footer';
import ScrollToTop from './component/scroll_to_top';

class App extends Component {
  constructor(props) {
    super(props);
    this.bindFunctions();
  }

  bindFunctions() {
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Header />
          <ScrollToTop>
            <Router />
          </ScrollToTop>
          <Footer />
        </React.Fragment>
      </BrowserRouter>
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
)(App);
