import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// delete PCNs from database
function* deletePcn(action) {
    console.log('in deletePcn, action.payload is', action.payload)
    try {
        const response = yield axios.get(`/api/pcn/deletepcn?id=${action.payload.id}&type=${action.payload.type}`);
        console.log('in deletePcn, response is:', response.data)
        yield put({ type: 'SET_PCN_DELETE', payload: response.data })
    } catch (error) {
        console.log('Error deleting PCN in saga:', error);
    }
}

function* deletePcnSaga() {
    yield takeEvery('DELETE_PCN', deletePcn);
}

export default deletePcnSaga;