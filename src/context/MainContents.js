import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const mainContentsReducer = (state, action) => {
  switch (action.type) {
    case 'getAllPlaylists':
      return {
        ...state,
        allPlaylists: action.payload,
        notAllPlaylistsNext: false,
        currentAllPlaylistsPage: 1,
      };
    case 'nextAllPlaylists':
      return {
        ...state,
        allPlaylists: state.allPlaylists.concat(action.payload),
        currentAllPlaylistsPage: state.currentAllPlaylistsPage + 1,
      };
    case 'notAllPlaylistsNext':
      return { ...state, notAllPlaylistsNext: true };
    case 'getRecentPlaylists':
      return { ...state, recentPlaylists: action.payload };
    case 'getWeekly':
      return { ...state, mainPlaylist: action.payload[0], mainDaily: action.payload[1] };
    case 'getMainRecommendDJ':
      return { ...state, mainDJ: action.payload };
    case 'getCurrentHashtag':
      return { ...state, mainHashtag: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getAllPlaylists = (dispatch) => async () => {
  try {
    const response = await server.get('/main/playlist');
    dispatch({ type: 'getAllPlaylists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getAllPlaylists' });
  }
};

const nextAllPlaylists =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await server.get(`/main/playlist/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextAllPlaylists', payload: response.data });
      } else {
        dispatch({ type: 'notAllPlaylistsNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with nextAllPlaylists' });
    }
  };

const getRecentPlaylists = (dispatch) => async () => {
  try {
    const response = await server.get('/main/recent');
    dispatch({ type: 'getRecentPlaylists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getRecentPlaylists' });
  }
};

const getWeekly = (dispatch) => async () => {
  try {
    const response = await server.get('/main/weekly');
    dispatch({ type: 'getWeekly', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getWeekly' });
  }
};

const postWeekly = (dispatch) => async () => {
  try {
    await server.post('/main/weekly');
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with postWeekly' });
  }
};

const getMainRecommendDJ = (dispatch) => async () => {
  try {
    const response = await server.get('/main/recommendDJ');
    dispatch({ type: 'getMainRecommendDJ', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMainRecommendDJ' });
  }
};

const getCurrentHashtag = (dispatch) => async () => {
  try {
    const response = await server.get('/main/hashtag');
    dispatch({ type: 'getCurrentHashtag', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getCurrentHashtag' });
  }
};

export const { Provider, Context } = createDataContext(
  mainContentsReducer,
  {
    getAllPlaylists,
    nextAllPlaylists,
    getRecentPlaylists,
    getWeekly,
    postWeekly,
    getMainRecommendDJ,
    getCurrentHashtag,
  },
  {
    allPlaylists: null,
    notAllPlaylistsNext: false,
    currentAllPlaylistsPage: 1,
    recentPlaylists: null,
    mainPlaylist: null,
    mainDaily: null,
    mainDJ: null,
    mainHashtag: null,
    errorMessage: '',
  },
);
