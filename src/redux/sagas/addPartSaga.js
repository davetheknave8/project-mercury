import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addPart(action){
    try{
        console.log(action.payload);
        yield axios.post('/api/parts/add', action.payload);
        yield put({type: 'FETCH_CURRENT_PARTS', payload: {id: action.payload.id, type: action.payload.type}});
    }
    catch(error){
        console.log('error adding part', error);
    }
}

function* addPartSaga(){
    yield takeEvery('ADD_PART', addPart);
}

export default addPartSaga;