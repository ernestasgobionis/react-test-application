import types from './types';

export interface ReduxAction {
  type: string;
  payload?: any;
}

/**
 * Currencies
 */
export function fetchCurrencies(): ReduxAction {
  return { type: types.FETCH_CURRENCIES.REQUEST };
}

export function fetchCurrenciesSuccess(currencies: object): ReduxAction {
  return { type: types.FETCH_CURRENCIES.SUCCESS, payload: currencies };
}

export function fetchCurrenciesFailure(error: object): ReduxAction {
  return { type: types.FETCH_CURRENCIES.FAILURE, payload: error };
}

/**
 * Analysis
 */
export function fetchPageSource(url: string): ReduxAction {
  return { type: types.FETCH_PAGE_SOURCE.REQUEST, payload: url };
}

export function fetchPageSourceSuccess(source: object): ReduxAction {
  return { type: types.FETCH_PAGE_SOURCE.SUCCESS, payload: source };
}

export function fetchPageSourceFailure(error: object): ReduxAction {
  return { type: types.FETCH_PAGE_SOURCE.FAILURE, payload: error };
}
