import { callGet } from '../../api/api';
import { call, put } from 'redux-saga/effects';
import { ReduxAction } from '../actions/actions';

export function* fetchItemSaga(
  url: string,
  successAction: (payload?: object) => ReduxAction,
  errorAction: (payload?: object) => ReduxAction,
  requestType: string = 'text/json',
) {
  try {
    const result = yield call(callGet, url, requestType);
    yield put(successAction(result));
  } catch (e) {
    yield put(errorAction(e));
  }
}
