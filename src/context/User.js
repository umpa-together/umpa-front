import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'initOtherInformation':
      return { ...state, otherUser: null };
    case 'getMyInformation':
      return {
        ...state,
        user: action.payload[0],
        myContents: action.payload[1],
      };
    case 'getOtherInformation':
      return {
        ...state,
        otherUser: action.payload[0],
        otherContents: action.payload[1],
      };
    case 'follow':
      return { ...state, user: action.payload[0], otherUser: action.payload[1] };
    case 'getProfile':
      return { ...state, user: action.payload };
    case 'getFollow':
      return { ...state, follow: action.payload };
    case 'getGenreLists':
      return { ...state, genreLists: action.payload };
    case 'initRepresentSongs':
      return { ...state, representSongs: null };
    case 'getRepresentSongs':
      return { ...state, representSongs: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const initOtherInformation = (dispatch) => () => {
  try {
    dispatch({ type: 'initOtherInformation' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initOtherInformation' });
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
  async ({ nickName, name, introduction, genre, songs, fd }) => {
    try {
      const response = await server.post('/user/editProfile', {
        nickName,
        name,
        introduction,
        genre,
        songs,
      });
      if (fd) {
        await server.post('/user/editProfileImage', fd, {
          header: { 'content-type': 'multipart/form-data' },
        });
      }
      dispatch({ type: 'getProfile', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with editProfile' });
    }
  };

const getFollow =
  (dispatch) =>
  async ({ opt, id }) => {
    try {
      const response = await server.get(`user/follow/${id}`);
      if (opt === 'follower') {
        dispatch({ type: 'getFollow', payload: response.data.follower });
      } else {
        dispatch({ type: 'getFollow', payload: response.data.following });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getfollower' });
    }
  };

const follow =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.post(`/user/follow/${id}`);
      dispatch({ type: 'follow', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with follow' });
    }
  };

const unfollow =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/user/follow/${id}`);
      dispatch({ type: 'follow', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unfollow' });
    }
  };

const initRepresentSongs = (dispatch) => () => {
  try {
    dispatch({ type: 'initRepresentSongs' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initRepresentSongs' });
  }
};

const getRepresentSongs =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/user/songs/${id}`);
      dispatch({ type: 'getRepresentSongs', payload: response.data });
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

const getGenreLists = (dispatch) => async () => {
  try {
    const response = await server.get('/user/genre');
    dispatch({ type: 'getGenreLists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getGenreLists' });
  }
};

const postGenre =
  (dispatch) =>
  async ({ genreLists }) => {
    try {
      await server.post('/user/genre', { genreLists });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postGenre' });
    }
  };

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    initOtherInformation,
    getMyInformation,
    getOtherInformation,
    editProfile,
    getFollow,
    follow,
    unfollow,
    initRepresentSongs,
    getRepresentSongs,
    postRepresentSongs,
    editRepresentSongs,
    getGenreLists,
    postGenre,
  },
  {
    user: null,
    myContents: null,
    follow: null,
    otherUser: null,
    otherContents: null,
    representSongs: null,
    genreLists: null,
    errorMessage: '',
  },
);
