import server from 'lib/api/server';
import { navigate, goBack } from 'lib/utils/navigation';
import createDataContext from 'lib/utils/createDataContext';

const playlistReducer = (state, action) => {
  switch (action.type) {
    case 'init_playlist':
      return { ...state, current_playlist: null, current_comments: null, current_songs: [] };
    case 'init_recomment':
      return { ...state, current_recomments: null };

    case 'getSelectedPlaylist':
      return {
        ...state,
        current_playlist: action.payload[0],
        current_comments: action.payload[1],
        current_songs: action.payload[0].songs,
      };
    case 'deleted_playlist':
      return { ...state, current_playlist: [] };
    case 'getComment':
      return { ...state, current_comments: action.payload };
    case 'addComment':
      return {
        ...state,
        current_playlist: action.payload[0],
        current_comments: action.payload[1],
      };
    case 'getreComment':
      return { ...state, current_recomments: action.payload };
    case 'likesPlaylist':
      return { ...state, current_playlist: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const addPlaylist =
  (dispatch) =>
  async ({ title, songs, hashtag, fd }) => {
    try {
      const response = await server.post('/playlist', { title, songs, hashtag });
      goBack();
      fd.append('playlistId', response.data);
      await server.post('/playlist/imgUpload', fd, {
        header: { 'content-type': 'multipart/form-data' },
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

const likesPlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.post(`/playlist/like/${id}`);
      dispatch({ type: 'likesPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesPlaylist' });
    }
  };

const unlikesPlaylist =
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
  async ({ id, commentid }) => {
    try {
      const response = await server.delete(`/playlist/comment/${id}/${commentid}`);
      dispatch({ type: 'getSelectedPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addreComment =
  (dispatch) =>
  async ({ id, commentid, text }) => {
    try {
      const response = await server.post(`/playlist/recomment/${id}/${commentid}`, { text });
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addreComment' });
    }
  };

const deletereComment =
  (dispatch) =>
  async ({ commentid }) => {
    try {
      const response = await server.delete(`/playlist/recomment/${commentid}`);
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deletereComment' });
    }
  };

const getreComment =
  (dispatch) =>
  async ({ commentid }) => {
    try {
      const response = await server.get(`/playlist/recomment/${commentid}`);
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getreComment' });
    }
  };

const likescomment =
  (dispatch) =>
  async ({ playlistid, id }) => {
    try {
      const response = await server.post(`/playlist/likecomment/${playlistid}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likescomment' });
    }
  };

const unlikescomment =
  (dispatch) =>
  async ({ playlistid, id }) => {
    try {
      const response = await server.delete(`/playlist/likecomment/${playlistid}/${id}`);
      dispatch({ type: 'getComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikescomment' });
    }
  };

const likesrecomment =
  (dispatch) =>
  async ({ commentid, id }) => {
    try {
      const response = await server.post(`/playlist/likerecomment/${commentid}/${id}`);
      dispatch({ type: 'getreComment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
    }
  };

const unlikesrecomment =
  (dispatch) =>
  async ({ commentid, id }) => {
    try {
      const response = await server.delete(`/playlist/likerecomment/${commentid}/${id}`);
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
    likesPlaylist,
    unlikesPlaylist,
    getSelectedPlaylist,
    addComment,
    deleteComment,
    addreComment,
    deletereComment,
    getreComment,
    likescomment,
    unlikescomment,
    likesrecomment,
    unlikesrecomment,
    initRecomment,
    postUserSong,
    deleteUserSong,
  },
  {
    current_playlist: null,
    current_comments: null,
    current_songs: [],
    current_recomments: null,
    errorMessage: '',
  },
);
