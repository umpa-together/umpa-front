import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const searchReducer = (state, action) => {
  switch (action.type) {
    case 'initSearch':
      return {
        ...state,
        playList: null,
        dj: null,
        daily: null,
        hashtag: null,
        hashtagHint: null,
        djHint: null,
      };
    case 'getAllContents':
      return {
        ...state,
        playList: action.payload.playlists,
        dj: action.payload.dj,
        daily: action.payload.daily,
      };
    case 'getAllContentsWithHashatg':
      return { ...state, playList: action.payload.playlists, daily: action.payload.daily };
    case 'hashtagHint':
      return { ...state, hashtagHint: action.payload };
    case 'djHint':
      return { ...state, djHint: action.payload };
    case 'searchHashtag':
      return { ...state, hashtag: action.payload };
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
  async ({ id }) => {
    try {
      const response = await server.get(`/search/${id}`);
      dispatch({ type: 'getAllContents', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getAllContents' });
    }
  };

const getAllContentsWithHashatg =
  (dispatch) =>
  async ({ term }) => {
    try {
      const response = await server.get(`/search/hashtag/${term}`);
      dispatch({ type: 'getAllContentsWithHashatg', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getAllContentsWithHashatg' });
    }
  };

const getHashtagHint =
  (dispatch) =>
  async ({ term }) => {
    try {
      const response = await server.get(`/search/hashtagHint/${term}`);
      dispatch({ type: 'hashtagHint', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getHashtagHint' });
    }
  };

const getDJHint =
  (dispatch) =>
  async ({ term }) => {
    try {
      const response = await server.get(`/search/djHint/${term}`);
      dispatch({ type: 'djHint', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getDJHint' });
    }
  };

const SearchHashtag =
  (dispatch) =>
  async ({ term }) => {
    try {
      const response = await server.get(`/search/hashtag/${term}`);
      dispatch({ type: 'searchHashtag', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
    }
  };

export const { Provider, Context } = createDataContext(
  searchReducer,
  {
    initSearch,
    getAllContents,
    getAllContentsWithHashatg,
    getHashtagHint,
    getDJHint,
    SearchHashtag,
  },
  {
    playList: null,
    dj: null,
    daily: null,
    hashtag: null,
    hashtagHint: null,
    djHint: null,
    errorMessage: '',
  },
);
