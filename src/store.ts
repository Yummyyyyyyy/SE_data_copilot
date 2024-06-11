import { createStore } from 'vuex';

interface VisualDataState {
  columns: any[];
  results: any[];
}

interface State {
  visualData: VisualDataState;
}

export default createStore<State>({
  state: {
    visualData: {
      columns: [],
      results: []
    }
  },
  mutations: {
    updateVisualData(state, payload: VisualDataState) {
      state.visualData.columns = payload.columns;
      state.visualData.results = payload.results;
    }
  }
});
