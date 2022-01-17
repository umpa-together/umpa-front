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
    case 'getRecentDailies':
      return { ...state, recentDailies: action.payload };
    case 'getMainRecommendDJ':
      return { ...state, mainDJ: action.payload };
    case 'getMainRecommendPlaylist':
      return { ...state, mainPlaylist: action.payload };
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
    const response = await server.get('/main/recent-playlists');
    dispatch({ type: 'getRecentPlaylists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getRecentPlaylists' });
  }
};

const getMainRecommendDJ = (dispatch) => async () => {
  try {
    const response = await server.get('/main/recommend-dj');
    dispatch({ type: 'getMainRecommendDJ', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMainRecommendDJ' });
  }
};

const getRecentDailies = (dispatch) => async () => {
  try {
    const response = await server.get('/main/recent-dailies');
    dispatch({ type: 'getRecentDailies', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getRecentDailies' });
  }
};

const getMainRecommendPlaylist = (dispatch) => async () => {
  try {
    const response = await server.get('/main/recommend-playlists');
    dispatch({ type: 'getMainRecommendPlaylist', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMainRecommendPlaylist' });
  }
};

export const { Provider, Context } = createDataContext(
  mainContentsReducer,
  {
    getAllPlaylists,
    nextAllPlaylists,
    getRecentPlaylists,
    getRecentDailies,
    getMainRecommendDJ,
    getMainRecommendPlaylist,
  },
  {
    allPlaylists: null,
    notAllPlaylistsNext: false,
    currentAllPlaylistsPage: 1,
    recentPlaylists: null,
    recentDailies: null,
    mainDJ: null,
    mainPlaylist: null,
    errorMessage: '',
  },
);
