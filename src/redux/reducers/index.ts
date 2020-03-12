import { combineReducers } from 'redux';
import currenciesReducer from './currencies';
import analysisReducer from './analysis';

const rootReducer = combineReducers({
  currencies: currenciesReducer,
  analysis: analysisReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
