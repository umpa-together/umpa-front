import server from 'lib/api/server';
import { navigate } from 'lib/utils/navigation';
import createDataContext from 'lib/utils/createDataContext';

const playlistReducer = (state, action) => {
  switch (action.type) {
    case 'getSelectedPlaylist':
      return { ...state, currentPlaylist: action.payload[0], currentComments: action.payload[1] };
    case 'deleted_playlist':
      return { ...state, currentPlaylist: [] };
    case 'getComment':
      return { ...state, currentComments: action.payload };
    case 'getPlaylist':
      return { ...state, currentPlaylist: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const addPlaylist =
  (dispatch) =>
  async ({ title, content, songs, hashtag, fd }) => {
    try {
      let imgResponse = null;
      const response = await server.post('/playlist', { title, content, songs, hashtag });
      if (fd) {
        fd.append('playlistId', response.data[0]._id);
        imgResponse = await server.post('/playlist/imgUpload', fd, {
          header: { 'content-type': 'multipart/form-data' },
        });
      }
      if (fd) {
        dispatch({ type: 'getSelectedPlaylist', payload: imgResponse.data });
      } else {
        dispatch({ type: 'getSelectedPlaylist', payload: response.data });
      }
      navigate('SelectedPlaylist', { post: true });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addPlaylist' });
    }
  };

const editPlaylist =
  (dispatch) =>
  async ({ title, content, hashtag, playlistId, songs }) => {
    try {
      const response = await server.post('/playlist/edit', {
        title,
        content,
        songs,
        hashtag,
        playlistId,
      });
      dispatch({ type: 'getPlaylist', payload: response.data });
      navigate('SelectedPlaylist', { post: false });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with editPlaylist' });
    }
  };

const deletePlaylist =
  () =>
  async ({ id }) => {
    await server.delete(`/playlist/${id}`);
  };

const likePlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.post(`/playlist/like/${id}`);
      dispatch({ type: 'getPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesPlaylist' });
    }
  };

const unLikePlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/playlist/like/${id}`);
      dispatch({ type: 'getPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikesPlaylist' });
    }
  };

const getSelectedPlaylist =
  (dispatch) =>
  async ({ id, postUserId }) => {
    try {
      const response = await server.get(`/playlist/${id}/${postUserId}`);
      if (response.data[0] === null) {
        dispatch({ type: 'deleted_playlist' });
      } else {
        dispatch({ type: 'getSelectedPlaylist', payload: response.data });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getSelectedPlaylist' });
    }
  };

const addComment =
  (dispatch) =>
  async ({ id, text }) => {
    try {
      const response = await server.post(`/playlist/comment/${id}`, { text });
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addComment' });
    }
  };

const deleteComment =
  (dispatch) =>
  async ({ id, commentId }) => {
    try {
      const response = await server.delete(`/playlist/comment/${id}/${commentId}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addRecomment =
  (dispatch) =>
  async ({ id, commentId, text }) => {
    try {
      const response = await server.post(`/playlist/recomment/${id}/${commentId}`, { text });
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addreComment' });
    }
  };

const deleteRecomment =
  (dispatch) =>
  async ({ id, commentId }) => {
    try {
      const response = await server.delete(`/playlist/recomment/${id}/${commentId}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deletereComment' });
    }
  };

const likeComment =
  (dispatch) =>
  async ({ playlistId, id }) => {
    try {
      const response = await server.post(`/playlist/likecomment/${playlistId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likescomment' });
    }
  };

const unLikeComment =
  (dispatch) =>
  async ({ playlistId, id }) => {
    try {
      const response = await server.delete(`/playlist/likecomment/${playlistId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikescomment' });
    }
  };

const likeRecomment =
  (dispatch) =>
  async ({ playlistId, id }) => {
    try {
      const response = await server.post(`/playlist/likerecomment/${playlistId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
    }
  };

const unLikeRecomment =
  (dispatch) =>
  async ({ playlistId, id }) => {
    try {
      const response = await server.delete(`/playlist/likerecomment/${playlistId}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikesrecomment' });
    }
  };

export const { Provider, Context } = createDataContext(
  playlistReducer,
  {
    addPlaylist,
    editPlaylist,
    deletePlaylist,
    likePlaylist,
    unLikePlaylist,
    getSelectedPlaylist,
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
    currentPlaylist: null,
    currentComments: null,
    errorMessage: '',
  },
);
