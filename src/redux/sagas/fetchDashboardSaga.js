import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDashboard(action) {
    console.log('in fetchDashboard, action.payload:', action.payload)
    try {
        const response = yield axios.get(`/api/pcn/getdashboard?id=${action.payload.userId}&status=${action.payload.status}`);
        console.log('in fetchDashboard, response.data is:', response.data)
        yield put({ type: 'SET_DASHBOARD', payload: response.data })
    } catch (error) {
        console.log('Error retrieving forms:', error);
    }
}

function* fetchDashboardSaga() {
    yield takeEvery('FETCH_DASHBOARD', fetchDashboard);
}

export default fetchDashboardSaga;