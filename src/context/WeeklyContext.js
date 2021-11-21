import server from 'lib/api/server';
import createDataContext from './createDataContext';

const WeeklyReducer = (state, action) => {
  switch (action.type) {
    case 'playlist':
      return { ...state, weeklyPlaylist: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    case 'getWeekly':
      return { ...state, mainPlaylist: action.payload[0], mainDaily: action.payload[1] };
    case 'getRecentPlaylists':
      return { ...state, recentPlaylists: action.payload };
    case 'getMusicArchive':
      return { ...state, musicArchive: action.payload };
    default:
      return state;
  }
};

const getWeeklyPlaylist = (dispatch) => async () => {
  try {
    const response = await server.get('/WeekPlaylist');
    dispatch({ type: 'playlist', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getWeekPlaylist' });
  }
};

const postWeekly = (dispatch) => async () => {
  try {
    await server.post('/Weekly');
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with postWeekly' });
  }
};

const getWeekly = (dispatch) => async () => {
  try {
    const response = await server.get('/Weekly');
    dispatch({ type: 'getWeekly', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getWeekly' });
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

const getMusicArchive = (dispatch) => async () => {
  try {
    const response = await server.get('/main/musicArchive');
    dispatch({ type: 'getMusicArchive', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMusicArchive' });
  }
};

export const { Provider, Context } = createDataContext(
  WeeklyReducer,
  { getWeeklyPlaylist, postWeekly, getRecentPlaylists, getMusicArchive, getWeekly },
  {
    weeklyPlaylist: null,
    mainPlaylist: null,
    mainDaily: null,
    recentPlaylists: null,
    musicArchive: null,
    errorMessage: '',
  },
);
