import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* addReplacement(action){
    try{
        yield axios.put('/api/parts/replacement', action.payload);
        yield put({type: 'FETCH_CURRENT_PARTS', payload: {id: action.payload.id, type: action.payload.type}})
    }
    catch(error){
        console.log('error adding replacement number', error)
    }
}

function* addReplacementSaga(){
    yield takeEvery('ADD_REPLACEMENT', addReplacement);
}

export default addReplacementSaga;