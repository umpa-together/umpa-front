import server from 'lib/api/server';
import { navigate } from 'lib/utils/navigation';
import createDataContext from 'lib/utils/createDataContext';

const playlistReducer = (state, action) => {
  switch (action.type) {
    case 'init_playlist':
      return { ...state, currentPlaylist: null, currentComments: null, currentSongs: [] };
    case 'init_recomment':
      return { ...state, currentRecomments: null };

    case 'getSelectedPlaylist':
      return {
        ...state,
        currentPlaylist: action.payload[0],
        currentComments: action.payload[1],
        currentSongs: action.payload[0].songs,
      };
    case 'deleted_playlist':
      return { ...state, currentPlaylist: [] };
    case 'getComment':
      return { ...state, currentComments: action.payload };
    case 'addComment':
      return {
        ...state,
        currentPlaylist: action.payload[0],
        currentComments: action.payload[1],
      };
    case 'getreComment':
      return { ...state, currentRecomments: action.payload };
    case 'likesPlaylist':
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
      navigate('SelectedPlaylist', {
        post: true,
        id: imgResponse.data[0]._id,
        postUser: response.data[0].postUserId,
      });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addPlaylist' });
    }
  };

const editPlaylist =
  (dispatch) =>
  async ({ title, songs, hashtag, playlistId }) => {
    try {
      await server.post('/playlist/edit', { title, songs, hashtag, playlistId });
      navigate('Account');
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with editPlaylist' });
    }
  };

const deletePlaylist =
  () =>
  async ({ id }) => {
    await server.delete(`/playlist/${id}`);
  };

/// //
const initRecomment = (dispatch) => () => {
  try {
    dispatch({ type: 'init_recomment' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initRecomment' });
  }
};
const initPlaylist = (dispatch) => () => {
  try {
    dispatch({ type: 'init_playlist' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initPlaylist' });
  }
};

const likePlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.post(`/playlist/like/${id}`);
      dispatch({ type: 'likesPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesPlaylist' });
    }
  };

const unLikePlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/playlist/like/${id}`);
      dispatch({ type: 'likesPlaylist', payload: response.data });
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
      dispatch({ type: 'addComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addComment' });
    }
  };

const deleteComment =
  (dispatch) =>
  async ({ id, commentId }) => {
    try {
      const response = await server.delete(`/playlist/comment/${id}/${commentId}`);
      dispatch({ type: 'getSelectedPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addRecomment =
  (dispatch) =>
  async ({ id, commentId, text }) => {
    try {
      const response = await server.post(`/playlist/recomment/${id}/${commentId}`, { text });
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addreComment' });
    }
  };

const deleteRecomment =
  (dispatch) =>
  async ({ commentId }) => {
    try {
      const response = await server.delete(`/playlist/recomment/${commentId}`);
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deletereComment' });
    }
  };

const getRecomment =
  (dispatch) =>
  async ({ commentId }) => {
    try {
      const response = await server.get(`/playlist/recomment/${commentId}`);
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getreComment' });
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
  async ({ commentId, id }) => {
    try {
      const response = await server.post(`/playlist/likerecomment/${commentId}/${id}`);
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
    }
  };

const unLikeRecomment =
  (dispatch) =>
  async ({ commentId, id }) => {
    try {
      const response = await server.delete(`/playlist/likerecomment/${commentId}/${id}`);
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikesrecomment' });
    }
  };

const postUserSong =
  (dispatch) =>
  async ({ playlistId, song }) => {
    try {
      await server.post(`/playlist/userSong/${playlistId}`, { song });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postUserSong' });
    }
  };

const deleteUserSong =
  (dispatch) =>
  async ({ playlistId, userSongId }) => {
    try {
      await server.delete(`/playlist/userSong/${playlistId}/${userSongId}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteUserSong' });
    }
  };

export const { Provider, Context } = createDataContext(
  playlistReducer,
  {
    initPlaylist,
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
    getRecomment,
    likeComment,
    unLikeComment,
    likeRecomment,
    unLikeRecomment,
    initRecomment,
    postUserSong,
    deleteUserSong,
  },
  {
    currentPlaylist: null,
    currentComments: null,
    currentSongs: [],
    currentRecomments: null,
    errorMessage: '',
  },
);
