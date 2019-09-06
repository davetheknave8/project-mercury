import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// delete PCNs from database
// 'SET_LIST' isn't correct
function* deletePcn(action) {
    console.log('in deletePcn, action.payload is', action.payload.type)
    try {
        const response = yield axios.delete(`/api/pcn/deletepcn?id=${action.payload.id}&type=${action.payload.type}`);
        console.log('in deletePcn, response is:', response.data);
        yield put({ type: 'SET_DASHBOARD', payload: response.data });
    } catch (error) {
        console.log('Error deleting PCN in saga:', error);
    }
}

function* deletePcnSaga() {
    yield takeEvery('DELETE_PCN', deletePcn);
}

export default deletePcnSaga;