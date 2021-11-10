import serverApi from 'api/serverApi';
import { navigate, goBack } from 'navigationRef';
import createDataContext from './createDataContext';

const playlistReducer = (state, action) => {
  switch (action.type) {
    case 'init_playlist':
      return { ...state, current_playlist: null, current_comments: null, current_songs: [] };
    case 'init_recomment':
      return { ...state, current_recomments: null };
    case 'getAllPlaylists':
      return {
        ...state,
        allPlaylists: action.payload,
        notAllPlaylistsNext: false,
        currentAllPlaylistsPage: 1,
      };
    case 'nextAllPlaylists':
      return {
        ...state,
        allPlaylists: state.allPlaylists.concat(action.payload),
        currentAllPlaylistsPage: state.currentAllPlaylistsPage + 1,
      };
    case 'notAllPlaylistsNext':
      return { ...state, notAllPlaylistsNext: true };
    case 'get_playlist':
      return {
        ...state,
        current_playlist: action.payload[0],
        current_comments: action.payload[1],
        current_songs: action.payload[0].songs,
      };
    case 'deleted_playlist':
      return { ...state, current_playlist: [] };
    case 'get_comment':
      return { ...state, current_comments: action.payload };
    case 'add_comment':
      return {
        ...state,
        current_playlist: action.payload[0],
        current_comments: action.payload[1],
        current_songs: action.payload[0].songs,
      };
    case 'get_recomment':
      return { ...state, current_recomments: action.payload };
    case 'like':
      return { ...state, current_playlist: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

// Playlist

const initPlaylist = (dispatch) => () => {
  try {
    dispatch({ type: 'init_playlist' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initPlaylist' });
  }
};

const initRecomment = (dispatch) => () => {
  try {
    dispatch({ type: 'init_recomment' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initRecomment' });
  }
};

const getAllPlaylists = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/playlist/all');
    dispatch({ type: 'getAllPlaylists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getAllPlaylists' });
  }
};

const nextAllPlaylists =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await serverApi.get(`/playlist/all/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextAllPlaylists', payload: response.data });
      } else {
        dispatch({ type: 'notAllPlaylistsNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getAllPlaylists' });
    }
  };

const addPlaylist =
  (dispatch) =>
  async ({ title, songs, hashtag, fd }, callback) => {
    try {
      const response = await serverApi.post('/playlist', { title, songs, hashtag });
      goBack();
      fd.append('playlistId', response.data);
      await serverApi.post('/playlist/imgUpload', fd, { header: { 'content-type': 'multipart/form-data' } });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addPlaylist' });
    }
    if (callback) {
      callback();
    }
  };

const editPlaylist =
  (dispatch) =>
  async ({ title, songs, hashtag, playlistId }, callback) => {
    try {
      await serverApi.post('/playlist/edit', { title, songs, hashtag, playlistId });
      navigate('Account');
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addPlaylist' });
    }
    if (callback) {
      callback();
    }
  };

const deletePlaylist =
  () =>
  async ({ id }) => {
    await serverApi.delete(`/playlist/${id}`);
  };

const likesPlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await serverApi.post(`/playlist/like/${id}`);
      dispatch({ type: 'like', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likes' });
    }
  };

const unlikesPlaylist =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await serverApi.delete(`/playlist/like/${id}`);
      dispatch({ type: 'like', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikes' });
    }
  };

const getPlaylist =
  (dispatch) =>
  async ({ id, postUserId }) => {
    try {
      const response = await serverApi.get(`/playlist/${id}/${postUserId}`);
      if (response.data[0] == null) {
        dispatch({ type: 'deleted_playlist' });
      } else {
        dispatch({ type: 'get_playlist', payload: response.data });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getPlaylist' });
    }
  };

// Comment

const addComment =
  (dispatch) =>
  async ({ id, text }) => {
    try {
      const response = await serverApi.post(`/playlist/comment/${id}`, { text });
      dispatch({ type: 'add_comment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addComment' });
    }
  };

const deleteComment =
  (dispatch) =>
  async ({ id, commentid }) => {
    try {
      const response = await serverApi.delete(`/playlist/comment/${id}/${commentid}`);
      dispatch({ type: 'get_playlist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addreComment =
  (dispatch) =>
  async ({ id, commentid, text }) => {
    try {
      const response = await serverApi.post(`/playlist/recomment/${id}/${commentid}`, { text });
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addreComment' });
    }
  };

const deletereComment =
  (dispatch) =>
  async ({ commentid }) => {
    try {
      const response = await serverApi.delete(`/playlist/recomment/${commentid}`);
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deletereComment' });
    }
  };

const getreComment =
  (dispatch) =>
  async ({ commentid }) => {
    try {
      const response = await serverApi.get(`/playlist/recomment/${commentid}`);
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getreComment' });
    }
  };

const likescomment =
  (dispatch) =>
  async ({ playlistid, id }) => {
    try {
      const response = await serverApi.post(`/playlist/likecomment/${playlistid}/${id}`);
      dispatch({ type: 'get_comment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likescomment' });
    }
  };

const unlikescomment =
  (dispatch) =>
  async ({ playlistid, id }) => {
    try {
      const response = await serverApi.delete(`/playlist/likecomment/${playlistid}/${id}`);
      dispatch({ type: 'get_comment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikescomment' });
    }
  };

const likesrecomment =
  (dispatch) =>
  async ({ commentid, id }) => {
    try {
      const response = await serverApi.post(`/playlist/likerecomment/${commentid}/${id}`);
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
    }
  };

const unlikesrecomment =
  (dispatch) =>
  async ({ commentid, id }) => {
    try {
      const response = await serverApi.delete(`/playlist/likerecomment/${commentid}/${id}`);
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikesrecomment' });
    }
  };

const postUserSong =
  (dispatch) =>
  async ({ playlistId, song }) => {
    try {
      const response = await serverApi.post(`/playlist/userSong/${playlistId}`, { song });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postUserSong' });
    }
  };

const deleteUserSong =
  (dispatch) =>
  async ({ playlistId, userSongId }) => {
    try {
      const response = await serverApi.delete(`/playlist/userSong/${playlistId}/${userSongId}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteUserSong' });
    }
  };

export const { Provider, Context } = createDataContext(
  playlistReducer,
  {
    initPlaylist,
    getAllPlaylists,
    nextAllPlaylists,
    addPlaylist,
    editPlaylist,
    deletePlaylist,
    likesPlaylist,
    unlikesPlaylist,
    getPlaylist,
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
    allPlaylists: null,
    notAllPlaylistsNext: false,
    currentAllPlaylistsPage: 1,
    current_playlist: null,
    current_comments: null,
    current_songs: [],
    current_recomments: null,
    errorMessage: '',
  },
);
