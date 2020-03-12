import BaseReducer from './base-reducer';
import types from '../actions/types';
import { ReduxAction } from '../actions/actions';

type LongestPath = {
  level: number;
  count: number;
  element: HTMLDocument | Element | null;
};

export type AnalysisStatus = {
  loading: boolean;
  message: string;
  state: string;
};

export type AnalysisState = {
  url: string | null;
  status: AnalysisStatus;
  longestPath: LongestPath;
  mostCommonTag: string | null;
  uniqueTags: Record<string, number>;
};

class AnalysisReducer extends BaseReducer {
  initialState: AnalysisState;
  handleActions: () => AnalysisState;
  constructor() {
    super();
    this.initialState = {
      url: null,
      status: {
        loading: false,
        message: '',
        state: 'idle',
      },
      longestPath: {
        level: 0,
        count: 0,
        element: null,
      },
      mostCommonTag: null,
      uniqueTags: {},
    };
    this.ACTION_HANDLERS = {
      [types.FETCH_PAGE_SOURCE.REQUEST]: this.fetchPageSourceRequest.bind(this),
      [types.FETCH_PAGE_SOURCE.FAILURE]: this.fetchPageSourceFailure.bind(this),
      [types.FETCH_PAGE_SOURCE.SUCCESS]: this.fetchPageSourceSuccess.bind(this),
    };
  }

  fetchPageSourceRequest(
    state: AnalysisState,
    action: ReduxAction,
  ): AnalysisState {
    return {
      ...this.initialState,
      url: action.payload,
      status: {
        loading: true,
        message: '',
        state: 'loading',
      },
    };
  }

  fetchPageSourceSuccess(
    state: AnalysisState,
    action: ReduxAction,
  ): AnalysisState {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(action.payload, 'text/html');

    let uniqueTags: { [index: string]: any } = {};
    let longestPath: LongestPath = { count: 0, level: 0, element: null };

    this.findTagsCount(htmlDoc, uniqueTags);
    const mostCommonTag = Object.entries(uniqueTags).sort(
      (a, b) => b[1] - a[1],
    )[0][0];
    this.findLongestPath(htmlDoc, 0, mostCommonTag, longestPath);
    return {
      ...state,
      status: {
        ...state.status,
        loading: false,
        state: 'success',
      },
      uniqueTags,
      mostCommonTag,
      longestPath,
    };
  }

  fetchPageSourceFailure(
    state: AnalysisState,
    action: ReduxAction,
  ): AnalysisState {
    return {
      ...state,
      status: {
        ...state.status,
        message: `Fetching analytics failed, error: ${action.payload.message}`,
        loading: false,
        state: 'error',
      },
    };
  }

  findTagsCount = (
    node: HTMLDocument | Element,
    uniqueTags: { [index: string]: any },
  ) => {
    let nodes = node.children;
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i]) {
        continue;
      }
      if (!uniqueTags[nodes[i].tagName]) {
        uniqueTags[nodes[i].tagName] = 1;
      } else {
        uniqueTags[nodes[i].tagName] += 1;
      }
      if (nodes[i].children.length > 0) {
        this.findTagsCount(nodes[i], uniqueTags);
      }
    }
  };

  findLongestPath = (
    node: HTMLDocument | Element,
    level: number,
    searchTag: string,
    longestPath: LongestPath,
  ) => {
    let nodes = node.children;
    let tagCount = 0;
    for (let i = 0; i < nodes.length; i++) {
      if (!nodes[i]) {
        continue;
      }
      if (nodes[i].tagName === searchTag) {
        tagCount += 1;
      }
      if (nodes[i].children.length > 0) {
        this.findLongestPath(nodes[i], level + 1, searchTag, longestPath);
      }
    }
    if (
      !longestPath.count ||
      (longestPath.count < tagCount && longestPath.level <= level)
    ) {
      longestPath.count = tagCount;
      longestPath.level = level;
      longestPath.element = node;
    }
  };
}

export default new AnalysisReducer().handleActions;
