import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* editPcn(action){
    try{
        yield axios.put('/api/pcn/edit', action.payload);
    }
    catch(error){
        console.log('error editing pcn', error);
    }
}

function* editPcnSaga(){
    yield takeEvery('EDIT_PCN', editPcn);
}

export default editPcnSaga;