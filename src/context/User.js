import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'initOtherUser':
      return { ...state, otherUser: null };
    case 'getMyInformation':
      return {
        ...state,
        user: action.payload,
        myPlayList: action.payload.myPlaylists && action.payload.myPlaylists.reverse(),
      };
    case 'getOtherInformation':
      return { ...state, otherUser: action.payload };
    case 'getLikePlaylists':
      return { ...state, likePlaylists: action.payload };
    case 'myPlaylist':
      return { ...state, myPlayList: action.payload.reverse() };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const initOtherUser = (dispatch) => () => {
  try {
    dispatch({ type: 'initOtherUser' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initOtherUser' });
  }
};

const getMyInformation = (dispatch) => async () => {
  try {
    const response = await server.get('/user');
    dispatch({ type: 'getMyInformation', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyInformation' });
  }
};

const getOtherInformation =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/user/other/${id}`);
      dispatch({ type: 'getOtherInformation', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getOtheruser' });
    }
  };

const editProfile =
  (dispatch) =>
  async ({ nickName, name, introduction }) => {
    try {
      const response = await server.post('/user/editProfile', { nickName, name, introduction });
      dispatch({ type: 'getMyInformation', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with editProfile' });
    }
  };

const editProfileImage =
  (dispatch) =>
  async ({ fd }) => {
    try {
      const response = await server.post('/user/editProfileImage', fd, {
        header: { 'content-type': 'multipart/form-data' },
      });
      dispatch({ type: 'getMyInformation', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with editProfileImage' });
    }
  };

const follow =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.post(`/user/follow/${id}`);
      dispatch({ type: 'getOtherInformation', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with follow' });
    }
  };

const unfollow =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/user/follow/${id}`);
      dispatch({ type: 'getOtherInformation', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unfollow' });
    }
  };

const getRepresentSongs =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/user/songs/${id}`);
      dispatch({ type: 'getSongs', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getRepresentSongs' });
    }
  };

const postRepresentSongs =
  (dispatch) =>
  async ({ songs }) => {
    try {
      await server.post('/user/songs', { songs });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postRepresentSongs' });
    }
  };

const editRepresentSongs =
  (dispatch) =>
  async ({ songs }) => {
    try {
      await server.post('/user/songs/edit', { songs });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with editRepresentSongs' });
    }
  };

/// ///////////
const getLikePlaylists = (dispatch) => async () => {
  try {
    const response = await server.get('/user/likePlaylists');
    dispatch({ type: 'getLikePlaylists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getLikePlaylists' });
  }
};

const addSonginPlaylists =
  (dispatch) =>
  async ({ song }) => {
    try {
      const response = await server.post('/user/songinPlaylists', { song });
      dispatch({ type: 'myPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addSonginPlaylists' });
    }
  };

const deleteSonginPlaylists =
  (dispatch) =>
  async ({ time }) => {
    try {
      const response = await server.get(`/user/songinPlaylists/${time}`);
      dispatch({ type: 'myPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addSonginPlaylists' });
    }
  };

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    initOtherUser,
    getMyInformation,
    getOtherInformation,
    editProfile,
    editProfileImage,
    follow,
    unfollow,
    getRepresentSongs,
    postRepresentSongs,
    editRepresentSongs,
    getLikePlaylists,
    addSonginPlaylists,
    deleteSonginPlaylists,
  },
  {
    user: null,
    otherUser: null,
    representSongs: null,
    myPlayList: null,
    likePlaylists: null,
    errorMessage: '',
  },
);
