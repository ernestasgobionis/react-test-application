import { ReduxAction } from '../actions/actions';

export default class BaseReducer {
  initialState: object;
  ACTION_HANDLERS: { [index: string]: any };
  handleActions: () => void;
  constructor() {
    this.initialState = {};
    this.ACTION_HANDLERS = {};
    this.handleActions = this.handler.bind(this);
  }

  handler(state: object, action: ReduxAction) {
    if (!state) {
      state = this.initialState;
    }
    const handler = this.ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
  }
}
