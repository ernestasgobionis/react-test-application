import { takeLatest, delay } from 'redux-saga/effects';
import types from '../actions/types';
import {
  fetchPageSourceSuccess,
  fetchPageSourceFailure,
  ReduxAction,
} from '../actions/actions';
import { fetchItemSaga } from './common-sagas';

export function* fetchPageSourceSaga(action: ReduxAction) {
  yield delay(1500);
  yield fetchItemSaga(
    action.payload,
    fetchPageSourceSuccess,
    fetchPageSourceFailure,
    'text/xml',
  );
}

export function* analysisSagas() {
  yield takeLatest(types.FETCH_PAGE_SOURCE.REQUEST, fetchPageSourceSaga);
}
