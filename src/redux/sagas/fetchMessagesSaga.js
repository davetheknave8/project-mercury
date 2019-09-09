import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMessages(action) {
    console.log('in fetchMessages, action.payload:', action.payload)
    try {
        const response = yield axios.get(`/api/pcn/getadmindashboard?id=${action.payload.id}`);
        console.log('in fetchMessages, response.data is:', response.data)
        yield put({ type: 'SET_MESSAGES', payload: response.data })
    } catch (error) {
        console.log('Error retrieving messages:', error);
    }
}

function* fetchMessagesSaga() {
    yield takeEvery('FETCH_MESSAGES', fetchMessages);
}

export default fetchMessagesSaga;