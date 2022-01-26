import { navigate } from 'lib/utils/navigation';
import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const dailyReducer = (state, action) => {
  switch (action.type) {
    case 'getSelectedDaily':
      return { ...state, currentDaily: action.payload[0], currentComments: action.payload[1] };
    case 'deleted_Daily':
      return { ...state, currentDaily: [] };
    case 'getComment':
      return { ...state, currentComments: action.payload };
    case 'getDaily':
      return { ...state, currentDaily: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const addDaily =
  (dispatch) =>
  async ({ textcontent, song, hashtag, fd }) => {
    try {
      let imgResponse = null;
      const response = await server.post('/daily', { textcontent, song, hashtag });
      // eslint-disable-next-line no-underscore-dangle
      if (fd._parts.length > 0) {
        fd.append('dailyId', response.data[0]._id);
        imgResponse = await server.post(`/daily/imgUpload/${response.data}`, fd, {
          header: { 'content-type': 'multipart/form-data' },
        });
      }
      if (fd._parts.length > 0) {
        dispatch({ type: 'getSelectedDaily', payload: imgResponse.data });
        navigate('SelectedDaily', { post: true });
      } else {
        dispatch({ type: 'getSelectedDaily', payload: response.data });
        navigate('SelectedDaily', { post: true });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addDaily' });
    }
  };

const editDaily =
  (dispatch) =>
  async ({ textcontent, song, hashtag, DailyId }) => {
    try {
      const response = await server.post('/daily/edit', { textcontent, song, hashtag, DailyId });
      dispatch({ type: 'getDaily', payload: response.data });
      navigate('SelectedDaily', { post: false });
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
      dispatch({ type: 'getDaily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likes' });
    }
  };

const unLikeDaily =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/daily/like/${id}`);
      dispatch({ type: 'getDaily', payload: response.data });
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
      dispatch({ type: 'getSelectedDaily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addComment' });
    }
  };

const deleteComment =
  (dispatch) =>
  async ({ id, commentId }) => {
    try {
      const response = await server.delete(`/daily/comment/${id}/${commentId}`);
      dispatch({ type: 'getSelectedDaily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addRecomment =
  (dispatch) =>
  async ({ id, commentId, text }) => {
    try {
      const response = await server.post(`/daily/recomment/${id}/${commentId}`, { text });
      dispatch({ type: 'getSelectedDaily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addRecomment' });
    }
  };

const deleteRecomment =
  (dispatch) =>
  async ({ id, commentId }) => {
    try {
      const response = await server.delete(`/daily/recomment/${id}/${commentId}`);
      dispatch({ type: 'getSelectedDaily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteRecomment' });
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
  async ({ dailyId, id }) => {
    try {
      const response = await server.post(`/daily/likerecomment/${dailyId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
    }
  };

const unLikeRecomment =
  (dispatch) =>
  async ({ dailyId, id }) => {
    try {
      const response = await server.delete(`/daily/likerecomment/${dailyId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikesrecomment' });
    }
  };

export const { Provider, Context } = createDataContext(
  dailyReducer,
  {
    addDaily,
    editDaily,
    deleteDaily,
    likeDaily,
    unLikeDaily,
    getSelectedDaily,
    addComment,
    deleteComment,
    addRecomment,
    deleteRecomment,
    likeComment,
    unLikeComment,
    likeRecomment,
    unLikeRecomment,
  },
  {
    currentDaily: null,
    currentComments: null,
    errorMessage: '',
  },
);
