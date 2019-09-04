import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* createParts(action){
    try{

    }
    catch(error){
        console.log('error creating part', error);
    }
}

function* createPartsSaga{
    yield takeEvery('CREATE_PART', createParts);
}

export default createPartsSaga;