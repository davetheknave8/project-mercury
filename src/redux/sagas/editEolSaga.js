import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editEol(action) {
    try {
        yield axios.put('/api/eol/edit', action.payload);
        yield put({ type: 'FETCH_DASHBOARD', payload: {userId: action.payload.userId, status: ''} })
    }
    catch (error) {
        console.log('error editing eol', error);
    }
}

function* editEolSaga() {
    yield takeEvery('EDIT_EOL', editEol);
}

export default editEolSaga;