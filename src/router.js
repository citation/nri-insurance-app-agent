import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Top from './container/top';
import CustomerList from './container/customer_list';
import CustomerDetail from './container/customer_detail';
import PolicyList from './container/policy_list';
import PolicyDetail from './container/policy_detail';
import ScanInsurancePolicy from './container/scan_insurance_policy';
import HealthCheckDetail from './container/health_check_detail';
import Analyzation from './container/analyzation';
import FinancialPlannerList from './container/financial_planner_list';
import Scan_medical_certificate from './container/scan_medical_certificate';
import Medical_record_search from './container/medical_record_search';
import OPTIN_CONFIRM from './container/optin_confirm';
import Payment_way_menu from './container/payment_way_menu'
import Account_menu from './container/account_menu';
import Account_edit from './container/account_edit';
import Account_confirm from './container/account_confirm';
import NowDevelopment from './container/now_development';


class router extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/index.html" component={Top}/>
          <Route exact path={"/"} component={Top}/>
          <Route exact path={"/customer"} component={CustomerList}/>
          <Route exact path={"/customer/list"} component={CustomerList}/>
          <Route exact path={"/customer/detail"} component={CustomerDetail}/>
          <Route exact path={"/policy"} component={PolicyList}/>
          <Route exact path={"/policy/list"} component={PolicyList}/>
          <Route exact path={"/policy/detail"} component={PolicyDetail}/>
          <Route exact path={"/scan/insurance_policy"} component={ScanInsurancePolicy}/>
          <Route exact path={"/healthcheck"} component={HealthCheckDetail}/>
          <Route exact path={"/healthcheck/detail"} component={HealthCheckDetail}/>
          <Route exact path={"/analyzation"} component={Analyzation}/>
          <Route exact path={"/financialplanners/list"} component={FinancialPlannerList}/>
          <Route exact path={"/scan/medical_certificate"} component={Scan_medical_certificate}/>
          <Route exact path={"/medical_record"} component={Medical_record_search} />
          <Route exact path={"/medical_record/search"} component={Medical_record_search} />
          <Route exact path={"/optin/confirm"} component={OPTIN_CONFIRM} />
          <Route exact path={"/payment_way/menu"} component={Payment_way_menu} />
          <Route exact path={"/account/menu"} component={Account_menu} />
          <Route exact path={"/account/edit"} component={Account_edit} />
          <Route exact path={"/account/confirm"} component={Account_confirm} />
          <Route exact path={"/now_development"} component={NowDevelopment} />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {}
};

const mapStateToProps = state => {
  return {}
};

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(router));

