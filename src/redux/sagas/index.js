import { all } from 'redux-saga/effects';
import loginSaga from './loginSaga';
import registrationSaga from './registrationSaga';
import userSaga from './userSaga';
import fetchPcnInfoSaga from './fetchPcnInfoSaga';
import fetchPcnSaga from './fetchPcnSaga';
import fetchDashboardSaga from './fetchDashboardSaga';
import createPcnSaga from './createPcnSaga';
import editPcnSaga from './editPcnSaga';
import searchPcnSaga from './searchPcnSaga'

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    fetchPcnInfoSaga(),
    fetchPcnSaga(),
    fetchDashboardSaga(),
    createPcnSaga(),
    editPcnSaga(),
    searchPcnSaga(),
  ]);
}
