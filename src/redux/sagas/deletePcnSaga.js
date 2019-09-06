import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// delete PCNs from database
// 'SET_LIST' isn't correct
function* deletePcn(action) {
    console.log('in deletePcn, action.payload is', action.payload.type)
    try {
        yield axios.delete(`/api/pcn/deletepcn?id=${action.payload.id}&type=${action.payload.type}`);
        console.log('in deletePcn saga', action.payload);
        yield put({ type: 'FETCH_DASHBOARD', payload: {status: action.payload.status, userId: action.payload.userId} });
    } catch (error) {
        console.log('Error deleting PCN in saga:', error);
    }
}

function* deletePcnSaga() {
    yield takeEvery('DELETE_PCN', deletePcn);
}

export default deletePcnSaga;