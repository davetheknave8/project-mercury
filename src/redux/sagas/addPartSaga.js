import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addPart(action){
    try{
        console.log('hello');
        yield axios.post('/api/parts/add', action.payload);
        yield put({type: 'FETCH_CURRENT_PARTS', payload: {pcnId: action.payload.pcnId}});
    }
    catch(error){
        console.log('error adding part', error);
    }
}

function* addPartSaga(){
    yield takeEvery('ADD_PART', addPart);
}

export default addPartSaga;