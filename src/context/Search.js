import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'initSearch':
      return {
        result: null,
        selected: null,
        recentKeyword: null,
        notNextSong: false,
        errorMessage: null,
      };
    case 'getAllContents':
      return { ...state, result: action.payload, notNextSong: false };
    case 'getNextSongResult':
      return {
        ...state,
        result: {
          ...state.result,
          song: state.result.song.concat(action.payload[0]),
          next: action.payload[1],
        },
      };
    case 'getSelectedContents':
      return { ...state, selected: action.payload };
    case 'notNextSong':
      return { ...state, notNextSong: true };
    case 'getAllContentsWithHashatg':
      return { ...state, selected: action.payload };
    case 'getRecentKeywords':
      return { ...state, recentKeyword: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const initSearch = (dispatch) => async () => {
  try {
    dispatch({ type: 'initSearch' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initPlaylist' });
  }
};

const getAllContents =
  (dispatch) =>
  async ({ term }) => {
    try {
      const response = await server.get(`/search/${term}`);
      dispatch({ type: 'getAllContents', payload: response.data });
      if (response.data.next === null) {
        dispatch({ type: 'notNextSong' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getAllContents' });
    }
  };

const getNextSongResult =
  (dispatch) =>
  async ({ nextUrl }) => {
    try {
      const response = await server.get(`/search/next/${nextUrl}`);
      if (response.data[0].length !== 0) {
        dispatch({ type: 'getNextSongResult', payload: response.data });
      } else {
        dispatch({ type: 'notNextSong' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getNextSongResult' });
    }
  };

const getSelectedContents =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/search/song/${id}`);
      dispatch({ type: 'getSelectedContents', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getSelectedContents' });
    }
  };

const getAllContentsWithHashatg =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/search/hashtag/${id}`);
      dispatch({ type: 'getAllContentsWithHashatg', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getAllContentsWithHashatg' });
    }
  };

const getRecentKeywords = (dispatch) => async () => {
  try {
    const response = await server.get('/search/keyword');
    dispatch({ type: 'getRecentKeywords', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getRecentKeywords' });
  }
};
export const { Provider, Context } = createDataContext(
  searchReducer,
  {
    initSearch,
    getAllContents,
    getNextSongResult,
    getSelectedContents,
    getAllContentsWithHashatg,
    getRecentKeywords,
  },
  {
    result: null,
    selected: null,
    recentKeyword: null,
    notNextSong: false,
    errorMessage: '',
  },
);
