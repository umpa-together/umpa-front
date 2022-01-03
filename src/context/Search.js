import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'initSearch':
      return { result: null, selected: null, errorMessage: null };
    case 'getAllContents':
      return { ...state, result: action.payload };
    case 'getSelectedContents':
      return { ...state, selected: action.payload };
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
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getAllContents' });
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
    getSelectedContents,
    getAllContentsWithHashatg,
    getRecentKeywords,
  },
  {
    result: null,
    selected: null,
    recentKeyword: null,
    errorMessage: '',
  },
);
