import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createNpi(action){
    try{
        const response = yield axios.post(`/api/npi/create`, action.payload);
        yield put({type: 'SET_CREATE_NPI', payload: response.data})
    } 
    catch(error) {
        console.log('error creating new npi', error);
    }
}

function* createNpiSaga(){
    yield takeEvery('CREATE_NPI', createNpi)
}

export default createNpiSaga;