import { navigate, goBack } from 'lib/utils/navigation';
import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const dailyReducer = (state, action) => {
  switch (action.type) {
    case 'initDaily':
      return { ...state, currentDaily: null, currentComments: null };
    case 'initRecomment':
      return { ...state, currentRecomments: null };
    case 'getSelectedDaily':
      return {
        ...state,
        currentDaily: action.payload[0],
        currentComments: action.payload[1],
      };
    case 'deleted_Daily':
      return { ...state, currentDaily: [] };
    case 'getComment':
      return { ...state, currentComments: action.payload };
    case 'getRecomment':
      return { ...state, currentRecomments: action.payload };
    case 'likesDaily':
      return { ...state, currentDaily: action.payload };
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
  async ({ textcontent, song, hashtag, fd }) => {
    try {
      const response = await server.post('/daily', { textcontent, song, hashtag });
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
  async ({ textcontent, song, hashtag, DailyId }) => {
    try {
      await server.post('/daily/edit', { textcontent, song, hashtag, DailyId });
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

const likeDaily =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.post(`/daily/like/${id}`);
      dispatch({ type: 'likesDaily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likes' });
    }
  };

const unLikeDaily =
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
  async ({ id, commentId }) => {
    try {
      const response = await server.delete(`/daily/comment/${id}/${commentId}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addreComment =
  (dispatch) =>
  async ({ id, commentId, text }) => {
    try {
      const response = await server.post(`/daily/recomment/${id}/${commentId}`, { text });
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addreComment' });
    }
  };

const deletereComment =
  (dispatch) =>
  async ({ commentId }) => {
    try {
      const response = await server.delete(`/daily/recomment/${commentId}`);
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deletereComment' });
    }
  };

const getRecomment =
  (dispatch) =>
  async ({ commentId }) => {
    try {
      const response = await server.get(`/daily/recomment/${commentId}`);
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getRecomment' });
    }
  };

const likeComment =
  (dispatch) =>
  async ({ dailyId, id }) => {
    try {
      const response = await server.post(`/daily/likecomment/${dailyId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likescomment' });
    }
  };

const unLikeComment =
  (dispatch) =>
  async ({ dailyId, id }) => {
    try {
      const response = await server.delete(`/daily/likecomment/${dailyId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikescomment' });
    }
  };

const likeRecomment =
  (dispatch) =>
  async ({ commentId, id }) => {
    try {
      const response = await server.post(`/daily/likerecomment/${commentId}/${id}`);
      dispatch({ type: 'getRecomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
    }
  };

const unLikeRecomment =
  (dispatch) =>
  async ({ commentId, id }) => {
    try {
      const response = await server.delete(`/daily/likerecomment/${commentId}/${id}`);
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
    likeDaily,
    unLikeDaily,
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
    currentDaily: null,
    currentComments: null,
    currentRecomments: null,
    errorMessage: '',
  },
);
