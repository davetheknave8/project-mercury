import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAdminDashboard(action) {
    console.log('in fetchAdminDashboard, action.payload:', action.payload)
    try {
        const response = yield axios.get(`/api/pcn/getadmindashboard?status=${action.payload.status}`);
        console.log('in fetchAdminDashboard, response.data is:', response.data)
        yield put({ type: 'SET_ADMIN_DASHBOARD', payload: response.data })
    } catch (error) {
        console.log('Error retrieving forms:', error);
    }
}

function* fetchAdminDashboardSaga() {
    yield takeEvery('FETCH_ADMIN_DASHBOARD', fetchAdminDashboard);
}

export default fetchAdminDashboardSaga;