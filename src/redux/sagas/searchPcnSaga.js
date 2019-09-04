import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* searchSaga (action) {
    
    try{
        // const response = yield axios.get(`/api/pcn/info?id=${action.payload.id}&type=${action.payload.type}`);
        const response = yield axios.get(`/api/pcn/search?search=${action.payload}`);
        console.log('in searchSaga', response);
        yield put({type: 'SET_LIST', payload: response.data})
        console.log('response.data', response.data);
    } catch (error) {
        console.log('error in Getting PCN documents', error)
    }
}

function* searchPcnSaga(){ 
    yield takeEvery('GET_SEARCH', searchSaga);
}

  
  export default searchPcnSaga;