import { takeLatest, delay } from 'redux-saga/effects';
import types from '../actions/types';
import {
  fetchCurrenciesFailure,
  fetchCurrenciesSuccess,
  ReduxAction,
} from '../actions/actions';
import { fetchItemSaga } from './common-sagas';

export function* fetchCurrenciesSaga(action: ReduxAction) {
  // Simulate longer loading
  yield delay(1500);
  const url = 'https://api.coindesk.com/v1/bpi/currentprice.json';
  yield fetchItemSaga(url, fetchCurrenciesSuccess, fetchCurrenciesFailure);
}

export function* currenciesSagas() {
  yield takeLatest(types.FETCH_CURRENCIES.REQUEST, fetchCurrenciesSaga);
}
