import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editEol(action) {
    try {
        yield axios.put('/api/eol/edit', action.payload);
    }
    catch (error) {
        console.log('error editing eol', error);
    }
}

function* editEolSaga() {
    yield takeEvery('EDIT_EOL', editEol);
}

export default editEolSaga;