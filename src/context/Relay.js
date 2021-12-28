import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const relayReducer = (state, action) => {
  switch (action.type) {
    case 'initRelay':
      return { ...state, selectedRelay: null, swipeSongs: null };
    case 'getCurrentRelay':
      return { ...state, currentRelay: action.payload };
    case 'getRelayLists':
      return { ...state, relayLists: action.payload };
    case 'getSelectedRelay':
      return { ...state, selectedRelay: action.payload };
    case 'getRelaySong':
      return { ...state, swipeSongs: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const initRelay = (dispatch) => () => {
  try {
    dispatch({ type: 'initRelay' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initRelay' });
  }
};

const getCurrentRelay = (dispatch) => async () => {
  try {
    const response = await server.get('/relay');
    dispatch({ type: 'getCurrentRelay', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getCurrentRelay' });
  }
};

const getRelayLists = (dispatch) => async () => {
  try {
    const response = await server.get('/relay/lists');
    dispatch({ type: 'getRelayLists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getRelayLists' });
  }
};

const getSelectedRelay =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/relay/${id}`);
      dispatch({ type: 'getSelectedRelay', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getSelectedRelay' });
    }
  };

const getRelaySong =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/relay/song/${id}`);
      dispatch({ type: 'getRelaySong', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getRelaySong' });
    }
  };

const likeRelaySong =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.post(`/relay/like/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likeRelaySong' });
    }
  };

const unlikeRelaySong =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.post(`/relay/unlike/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikeRelaySong' });
    }
  };

export const { Provider, Context } = createDataContext(
  relayReducer,
  {
    initRelay,
    getCurrentRelay,
    getRelayLists,
    getSelectedRelay,
    getRelaySong,
    likeRelaySong,
    unlikeRelaySong,
  },
  {
    currentRelay: null,
    relayLists: null,
    selectedRelay: null,
    swipeSongs: null,
  },
);
