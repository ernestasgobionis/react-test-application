import BaseReducer from './base-reducer';
import types from '../actions/types';
import { ReduxAction } from '../actions/actions';

export type CurrenciesStatus = {
  loading: boolean;
  message: string;
  state: string;
  lastUpdate: Date;
};

export type CurrenciesItem = {
  code: string;
  description: string;
  rate: string;
  rate_float: number;
  symbol: string;
  [index: string]: any;
};

export type CurrenciesState = {
  status: CurrenciesStatus;
  items: CurrenciesItem[];
};

class CurrenciesReducer extends BaseReducer {
  initialState: CurrenciesState;
  handleActions: () => CurrenciesState;
  constructor() {
    super();
    this.initialState = {
      status: {
        loading: false,
        message: '',
        state: 'idle',
        lastUpdate: new Date(),
      },
      items: [],
    };
    this.ACTION_HANDLERS = {
      [types.FETCH_CURRENCIES.REQUEST]: this.fetchCurrenciesRequest.bind(this),
      [types.FETCH_CURRENCIES.FAILURE]: this.fetchCurrenciesFailure.bind(this),
      [types.FETCH_CURRENCIES.SUCCESS]: this.fetchCurrenciesSuccess.bind(this),
    };
  }

  fetchCurrenciesRequest(
    state: CurrenciesState,
    action: ReduxAction,
  ): CurrenciesState {
    return {
      ...state,
      status: {
        ...state.status,
        message: 'Fetching currencies...',
        loading: true,
        state: 'loading',
      },
    };
  }

  fetchCurrenciesSuccess(
    state: CurrenciesState,
    action: ReduxAction,
  ): CurrenciesState {
    const items: CurrenciesItem[] = Object.values(action.payload.bpi);
    return {
      ...state,
      status: {
        message: `Latest fetch: ${action.payload.time.updated}`,
        lastUpdate: new Date(),
        loading: false,
        state: 'success',
      },
      items,
    };
  }

  fetchCurrenciesFailure(
    state: CurrenciesState,
    action: ReduxAction,
  ): CurrenciesState {
    return {
      ...state,
      status: {
        ...state.status,
        message: `Fetching currencies failed, error: ${action.payload.message}`,
        loading: false,
        state: 'error',
      },
    };
  }
}

export default new CurrenciesReducer().handleActions;
