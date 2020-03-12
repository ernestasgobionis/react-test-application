import { all } from 'redux-saga/effects';
import { currenciesSagas } from './currencies-sagas';
import { analysisSagas } from './analysis-sagas';

export default function* RootSaga() {
  yield all([currenciesSagas(), analysisSagas()]);
}
