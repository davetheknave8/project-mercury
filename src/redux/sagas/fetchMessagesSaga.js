import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchMessages(action) {
    console.log('in fetchMessages, action.payload:', action.payload)
    try {
        const response = yield axios.get(`/api/pcn/messages?id=${action.payload.userId}`);
        console.log('in fetchMessages, response.data is:', response.data)
        yield put({ type: 'SET_MESSAGES', payload: response.data })
    } catch (error) {
        console.log('Error retrieving messages:', error);
    }
}

function* fetchUnreadMessages(action) {
    console.log('in fetchUnreadMessages, action.payload:', action.payload)
    try {
        const response = yield axios.get(`/api/pcn/unreadmessages?id=${action.payload.userId}`);
        console.log('in fetchUnreadMessages, response.data is:', response.data)
        yield put({ type: 'SET_UNREAD_MESSAGES', payload: response.data })
    } catch (error) {
        console.log('Error retrieving unread messages:', error);
    }
}

function* fetchMessagesSaga() {
    yield takeEvery('FETCH_MESSAGES', fetchMessages);
    yield takeEvery('FETCH_UNREAD_MESSAGES', fetchUnreadMessages)
}

export default fetchMessagesSaga;