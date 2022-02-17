import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const relayReducer = (state, action) => {
  switch (action.type) {
    case 'initRelay':
      return { ...state, selectedRelay: null, swipeSongs: null };
    case 'getCurrentRelay':
      return { ...state, currentRelay: action.payload };
    case 'getRelayLists':
      return { ...state, relayLists: action.payload, notNextRelay: false, currentRelayPage: 1 };
    case 'nextRelayLists':
      return {
        ...state,
        relayLists: state.relayLists.concat(action.payload),
        currentRelayPage: state.currentRelayPage + 1,
      };
    case 'notNext':
      return { ...state, notNextRelay: true };
    case 'getSelectedRelay':
      return { ...state, selectedRelay: action.payload[0], currentComments: action.payload[1] };
    case 'setRelaySong':
      return {
        ...state,
        selectedRelay: { playlist: action.payload[0], songs: [] },
        swipeSongs: action.payload[1],
      };
    case 'getRelaySong':
      return { ...state, swipeSongs: action.payload };
    case 'updateRelayWithComment':
      return {
        ...state,
        selectedRelay: {
          ...state.selectedRelay,
          playlist: { ...state.selectedRelay.playlist, comments: action.payload[0] },
        },
        currentComments: action.payload[1],
      };
    case 'getComment':
      return { ...state, currentComments: action.payload };
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

const getNextRelayLists =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await server.get(`/relay/lists/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextRelayLists', payload: response.data });
      } else {
        dispatch({ type: 'notNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getNextRelayLists' });
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

const setRelaySong =
  (dispatch) =>
  ({ data }) => {
    dispatch({ type: 'setRelaySong', payload: data });
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

const postRelaySong =
  (dispatch) =>
  async ({ song, playlistId }) => {
    try {
      await server.post(`/relay/song/${playlistId}`, { song });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postRelaySong' });
    }
  };

const likeRelaySong =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.put(`/relay/songs-like/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likeRelaySong' });
    }
  };

const unlikeRelaySong =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.put(`/relay/songs-unlike/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikeRelaySong' });
    }
  };

const likeRelayPlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.put(`relay/playlists-like/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likeRelayPlaylist' });
    }
  };

const unlikeRelayPlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.put(`relay/playlists-unlike/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikeRelayPlaylist' });
    }
  };

const addComment =
  (dispatch) =>
  async ({ id, text }) => {
    try {
      const response = await server.post(`/relay/comment/${id}`, { text });
      dispatch({ type: 'updateRelayWithComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addComment' });
    }
  };

const deleteComment =
  (dispatch) =>
  async ({ id, commentId }) => {
    try {
      const response = await server.delete(`/relay/comment/${id}/${commentId}`);
      dispatch({ type: 'updateRelayWithComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addRecomment =
  (dispatch) =>
  async ({ id, commentId, text }) => {
    try {
      const response = await server.post(`/relay/recomment/${id}/${commentId}`, { text });
      dispatch({ type: 'updateRelayWithComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addRecomment' });
    }
  };

const deleteRecomment =
  (dispatch) =>
  async ({ id, commentId }) => {
    try {
      const response = await server.delete(`/relay/recomment/${id}/${commentId}`);
      dispatch({ type: 'updateRelayWithComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteRecomment' });
    }
  };

const likeComment =
  (dispatch) =>
  async ({ relayId, id }) => {
    try {
      const response = await server.put(`/relay/comments-like/${relayId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likeComment' });
    }
  };

const unLikeComment =
  (dispatch) =>
  async ({ relayId, id }) => {
    try {
      const response = await server.put(`/relay/comments-unlike/${relayId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unLikeComment' });
    }
  };

const likeRecomment =
  (dispatch) =>
  async ({ relayId, id }) => {
    try {
      const response = await server.put(`/relay/recomments-like/${relayId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likeRecomment' });
    }
  };

const unLikeRecomment =
  (dispatch) =>
  async ({ relayId, id }) => {
    try {
      const response = await server.put(`/relay/recomments-unlike/${relayId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unLikeRecomment' });
    }
  };

export const { Provider, Context } = createDataContext(
  relayReducer,
  {
    initRelay,
    getCurrentRelay,
    getRelayLists,
    getNextRelayLists,
    getSelectedRelay,
    getRelaySong,
    postRelaySong,
    likeRelaySong,
    unlikeRelaySong,
    likeRelayPlaylist,
    unlikeRelayPlaylist,
    addComment,
    deleteComment,
    addRecomment,
    deleteRecomment,
    likeComment,
    unLikeComment,
    likeRecomment,
    unLikeRecomment,
    setRelaySong,
  },
  {
    currentRelay: null,
    currentRelayPage: 1,
    notNextRelay: false,
    relayLists: null,
    selectedRelay: null,
    swipeSongs: null,
    currentComments: [],
  },
);
