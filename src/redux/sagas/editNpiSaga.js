import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

function* editNpi(action){
    try{
        yield axios.put('/api/npi/edit', action.payload.newNpi);
        yield put({ type: 'FETCH_DASHBOARD', payload: action.payload.id })
    }
    catch(error){
        console.log('error editing pcn', error);
    }
}

function* editNpiSaga(){
    yield takeEvery('EDIT_NPI', editNpi);
}

export default editNpiSaga;