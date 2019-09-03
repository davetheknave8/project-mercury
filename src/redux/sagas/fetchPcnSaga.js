import { put  } from 'redux-saga/effects';
import axios from 'axios';
import {takeEvery} from 'redux-saga/effects';

// GETs all the main dates for the calendar and sends them to the DOM.

function* fetchSaga () {
    try{
        const response = yield axios.get(`/api/pcn`);
        console.log('in fetchList', response);
        yield put({type: 'SET_LIST', payload: response.data})
        console.log('response.data', response.data);
    } catch (error) {
        console.log('error in GETTing Dates', error)
    }
}

function* fetchPcnSaga(){
    yield takeEvery('FETCH_PCN_LIST', fetchSaga);
}

  
  export default fetchPcnSaga;