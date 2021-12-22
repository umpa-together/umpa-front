import { navigate, goBack } from 'lib/utils/navigation';
import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const dailyReducer = (state, action) => {
  switch (action.type) {
    case 'initDaily':
      return { ...state, current_daily: null, current_comments: null, current_songs: [] };
    case 'initRecomment':
      return { ...state, current_recomments: null };
    case 'getSelectedDaily':
      return {
        ...state,
        current_daily: action.payload[0],
        current_comments: action.payload[1],
        current_songs: action.payload[0].songs,
      };
    case 'deleted_Daily':
      return { ...state, current_daily: [] };
    case 'getComment':
      return { ...state, current_comments: action.payload };
    case 'getRecomment':
      return { ...state, current_recomments: action.payload };
    case 'likesDaily':
      return { ...state, current_daily: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

// Daily
const initDaily = (dispatch) => () => {
  try {
    dispatch({ type: 'initDaily' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initDaily' });
  }
};

const initRecomment = (dispatch) => () => {
  try {
    dispatch({ type: 'initRecomment' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initRecomment' });
  }
};

const addDaily =
  (dispatch) =>
  async ({ textcontent, songs, hashtag, fd }) => {
    try {
      const response = await server.post('/daily', { textcontent, songs, hashtag });
      goBack();
      // eslint-disable-next-line no-underscore-dangle
      if (fd._parts.length !== 0) {
        await server.post(`/daily/imgUpload/${response.data}`, fd, {
          header: { 'content-type': 'multipart/form-data' },
        });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addDaily' });
    }
  };

const editDaily =
  (dispatch) =>
  async ({ textcontent, songs, hashtag, DailyId }) => {
    try {
      await server.post('/daily/edit', { textcontent, songs, hashtag, DailyId });
      navigate('Account');
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addDaily' });
    }
  };

const deleteDaily =
  () =>
  async ({ id }) => {
    await server.delete(`/daily/${id}`);
  };

const likesDaily =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.post(`/daily/like/${id}`);
      dispatch({ type: 'likesDaily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likes' });
    }
  };

const unlikesDaily =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/daily/like/${id}`);
      dispatch({ type: 'likesDaily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikes' });
    }
  };

const getSelectedDaily =
  (dispatch) =>
  async ({ id, postUserId }) => {
    try {
      const response = await server.get(`/daily/${id}/${postUserId}`);
      if (response.data[0] == null) {
        dispatch({ type: 'deleted_Daily' });
      } else {
        dispatch({ type: 'getSelectedDaily', payload: response.data });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getSelectedDaily' });
    }
  };

const addComment =
  (dispatch) =>
  async ({ id, text }) => {
    try {
      const response = await server.post(`/daily/comment/${id}`, { text });
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addComment' });
    }
  };

const deleteComment =
  (dispatch) =>
  async ({ id, commentid }) => {
    try {
      const response = await server.delete(`/daily/comment/${id}/${commentid}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addreComment =
  (dispatch) =>
  async ({ id, commentid, text }) => {
    try {
      const response = await server.post(`/daily/recomment/${id}/${commentid}`, { text });
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addreComment' });
    }
  };

const deletereComment =
  (dispatch) =>
  async ({ commentid }) => {
    try {
      const response = await server.delete(`/daily/recomment/${commentid}`);
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deletereComment' });
    }
  };

const getRecomment =
  (dispatch) =>
  async ({ commentid }) => {
    try {
      const response = await server.get(`/daily/recomment/${commentid}`);
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getRecomment' });
    }
  };

const likeComment =
  (dispatch) =>
  async ({ dailyid, id }) => {
    try {
      const response = await server.post(`/daily/likecomment/${dailyid}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likescomment' });
    }
  };

const unLikeComment =
  (dispatch) =>
  async ({ dailyid, id }) => {
    try {
      const response = await server.delete(`/daily/likecomment/${dailyid}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikescomment' });
    }
  };

const likeRecomment =
  (dispatch) =>
  async ({ commentid, id }) => {
    try {
      const response = await server.post(`/daily/likerecomment/${commentid}/${id}`);
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
    }
  };

const unLikeRecomment =
  (dispatch) =>
  async ({ commentid, id }) => {
    try {
      const response = await server.delete(`/daily/likerecomment/${commentid}/${id}`);
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikesrecomment' });
    }
  };

export const { Provider, Context } = createDataContext(
  dailyReducer,
  {
    initDaily,
    initRecomment,
    addDaily,
    editDaily,
    deleteDaily,
    likesDaily,
    unlikesDaily,
    getSelectedDaily,
    addComment,
    deleteComment,
    addreComment,
    deletereComment,
    getRecomment,
    likeComment,
    unLikeComment,
    likeRecomment,
    unLikeRecomment,
  },
  {
    current_daily: null,
    current_comments: null,
    current_songs: [],
    current_recomments: null,
    errorMessage: '',
  },
);
