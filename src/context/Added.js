import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const addedReducer = (state, action) => {
  switch (action.type) {
    case 'getAddedSong':
      return { ...state, songLists: action.payload };
    case 'getAddedPlaylist':
      return { ...state, playlists: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const postAddedSong =
  (dispatch) =>
  async ({ song }) => {
    try {
      await server.post('/added', { song });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postAddedSong' });
    }
  };

const getAddedSong = (dispatch) => async () => {
  try {
    const response = await server.get('/added');
    dispatch({ type: 'getAddedSong', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getAddedSong' });
  }
};

const deleteAddedSong =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/added/${id}`);
      dispatch({ type: 'getAddedSong', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteAddedSong' });
    }
  };

const postAddedPlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.post(`/added/playlist/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postAddedPlaylist' });
    }
  };

const getAddedPlaylist = (dispatch) => async () => {
  try {
    const response = await server.get('/added/playlist');
    dispatch({ type: 'getAddedPlaylist', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getAddedPlaylist' });
  }
};

const deleteAddedPlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/added/playlist/${id}`);
      dispatch({ type: 'getAddedPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteAddedPlaylist' });
    }
  };

export const { Provider, Context } = createDataContext(
  addedReducer,
  {
    postAddedSong,
    getAddedSong,
    deleteAddedSong,
    postAddedPlaylist,
    getAddedPlaylist,
    deleteAddedPlaylist,
  },
  { songLists: null, playlists: null },
);
