import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchCurrentParts(action){
    try{
        const response = yield axios.get(`/api/parts/current?pcn_id=${action.payload.pcnId}`);
        yield put({type: 'SET_CURRENT_PARTS', payload: response.data})
    }
    catch(error){
        console.log('error fetching current parts', error);
    }
}

function* fetchCurrentPartsSaga(){
    yield takeEvery('FETCH_CURRENT_PARTS', fetchCurrentParts);
}

export default fetchCurrentPartsSaga;