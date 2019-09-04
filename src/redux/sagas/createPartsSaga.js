import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createParts(action){
    try{
        console.log(action.payload.pcnNumber);
        const pcnNumber = action.payload.pcnNumber
        yield axios.post('/api/parts/create', action.payload);
        yield put({type: 'FETCH_CURRENT_PARTS', payload: {pcnId: pcnNumber}})
    }
    catch(error){
        console.log('error creating part', error);
    }
}

function* createPartsSaga(){
    yield takeEvery('CREATE_PART', createParts);
}

export default createPartsSaga;