import React from 'react';
import { Route } from 'react-router';

import App from './components/App';
import Patients from './containers/Patients';
import FilterBuilder from './containers/FilterBuilder';
import PrintPatientList from './containers/PrintPatientList';

export default (
  <Route component={App}>
    <Route path="/" component={Patients} />
    <Route path="/FilterBuilder" component={FilterBuilder} />
    <Route path="/PrintPatientList" component={PrintPatientList} />
  </Route>
);
