import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchPcnInfo(action) {
    console.log('in fetchPcnInfo, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/Events/${action.payload}`);
        console.log('in fetchPcnInfo, response is:', response.data)
        yield put({ type: 'SET_PCN_INFO', payload: response.data })
    } catch (error) {
        console.log('Error retrieving collection:', error);
    }
}

function* fetchPcnInfoSaga() {
    yield takeEvery('FETCH_PCN_INFO', fetchPcnInfo);
}

export default fetchPcnInfoSaga;
