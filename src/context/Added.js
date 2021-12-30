import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const addedReducer = (state, action) => {
  switch (action.type) {
    case 'getAddedSong':
      return { ...state, songLists: action.payload };
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

export const { Provider, Context } = createDataContext(
  addedReducer,
  {
    postAddedSong,
    getAddedSong,
    // postAddedPlaylist,
    // getAddedPlaylist,
  },
  { songLists: null, playlists: null },
);
