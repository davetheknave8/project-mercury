import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* searchSaga (action) {
    console.log('search saga action.payload', action.payload)
    try{
        // const response = yield axios.get(`/api/pcn/info?id=${action.payload.id}&type=${action.payload.type}`);
        const response = yield axios.get(`/api/pcn/search?=${action.payload.type}`);
        console.log('in searchSaga', response);
        yield put({type: 'SEARCH_REDUCER', payload: response.data})
        console.log('response.data', response.data);
    } catch (error) {
        console.log('error in Getting PCN documents', error)
    }
}

function* searchPcnSaga(){ 
    yield takeEvery('GET_SEARCH', searchSaga);
}

  
  export default searchPcnSaga;