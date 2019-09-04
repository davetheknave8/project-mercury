import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createPcn(action){
    try{
        const response = yield axios.post('/api/pcn/create');
        yield put({type: 'SET_CREATE_PCN', payload: response.data})
    } 
    catch(error) {
        console.log('error creating new pcn', error);
    }
}

function* createPcnSaga(){
    yield takeEvery('CREATE_PCN', createPcn)
}

export default createPcnSaga;