import serverApi from 'api/serverApi';
import createDataContext from './createDataContext';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'initUser':
      return { ...state, myContents: null };
    case 'initOtherUser':
      return { ...state, otherUser: null };
    case 'getMyInfo':
      return { ...state, myInfo: action.payload, myPlayList: action.payload.myPlaylists.reverse() };
    case 'get_otheruser':
      return { ...state, otherUser: action.payload };
    case 'getMyBookmark':
      return { ...state, boardBookmark: action.payload };
    case 'getMyContent':
      return { ...state, myContents: action.payload };
    case 'getMyScrab':
      return { ...state, myContents: action.payload };
    case 'getMyBoardSongs':
      return { ...state, myBoardSongs: action.payload };
    case 'getLikePlaylists':
      return { ...state, likePlaylists: action.payload };
    case 'getMyStory':
      return { ...state, myStory: action.payload[0], storyViewer: action.payload[1] };
    case 'myPlaylist':
      return { ...state, myPlayList: action.payload.reverse() };
    case 'myStory':
      return { ...state, myStory: action.payload };
    case 'otherStory':
      return { ...state, otherStory: action.payload };
    case 'storyCalendar':
      return { ...state, storyCalendar: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const initUser = (dispatch) => () => {
  try {
    dispatch({ type: 'initUser' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initUser' });
  }
};

const initOtherUser = (dispatch) => () => {
  try {
    dispatch({ type: 'initOtherUser' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initOtherUser' });
  }
};

const getMyInfo = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user');
    dispatch({ type: 'getMyInfo', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyInfo' });
  }
};

const getOtheruser =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await serverApi.get(`/user/other/${id}`);
      dispatch({ type: 'get_otheruser', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getOtheruser' });
    }
  };

const editProfile =
  (dispatch) =>
  async ({ nickName, name, introduction }) => {
    try {
      const response = await serverApi.post('/user/editProfile', { nickName, name, introduction });
      dispatch({ type: 'getMyInfo', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with editProfile' });
    }
  };

const editProfileImage =
  (dispatch) =>
  async ({ fd }) => {
    try {
      const response = await serverApi.post('/user/editProfileImage', fd, {
        header: { 'content-type': 'multipart/form-data' },
      });
      dispatch({ type: 'getMyInfo', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with setProfileImage' });
    }
  };

const follow =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await serverApi.post(`/user/follow/${id}`);
      dispatch({ type: 'get_otheruser', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with follow' });
    }
  };

const unfollow =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await serverApi.delete(`/user/follow/${id}`);
      dispatch({ type: 'get_otheruser', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unfollow' });
    }
  };

const getMyBookmark = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user/bookmark');
    dispatch({ type: 'getMyBookmark', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyBookmark' });
  }
};

const getMyContent = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user/content');
    dispatch({ type: 'getMyContent', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyContent' });
  }
};

const getMyComment = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user/comment');
    dispatch({ type: 'getMyContent', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyComment' });
  }
};

const getMyScrab = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user/scrab');
    dispatch({ type: 'getMyContent', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyScrab' });
  }
};

const getMyBoardSongs = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user/boardSongs');
    dispatch({ type: 'getMyBoardSongs', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyBoardSongs' });
  }
};

const getLikePlaylists = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user/likePlaylists');
    dispatch({ type: 'getLikePlaylists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getLikePlaylists' });
  }
};

const addSonginPlaylists =
  (dispatch) =>
  async ({ song }) => {
    try {
      const response = await serverApi.post('/user/songinPlaylists', { song });
      dispatch({ type: 'myPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addSonginPlaylists' });
    }
  };

const deleteSonginPlaylists =
  (dispatch) =>
  async ({ time }) => {
    try {
      const response = await serverApi.get(`/user/songinPlaylists/${time}`);
      dispatch({ type: 'myPlaylist', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addSonginPlaylists' });
    }
  };

const postStory =
  (dispatch) =>
  async ({ song }) => {
    try {
      const response = await serverApi.post('/user/story', { song });
      dispatch({ type: 'myStory', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postStory' });
    }
  };

const deleteStory = (dispatch) => async () => {
  try {
    const response = await serverApi.delete('/user/story');
    dispatch({ type: 'myStory', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with postStory' });
  }
};

const getMyStory = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user/myStory');
    dispatch({ type: 'getMyStory', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyStory' });
  }
};

const getOtherStory = (dispatch) => async () => {
  try {
    const response = await serverApi.get('/user/otherStory');
    dispatch({ type: 'otherStory', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getOtherStory' });
  }
};

const storyView =
  (dispatch) =>
  async ({ id }) => {
    try {
      await serverApi.get(`/user/storyView/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with storyView' });
    }
  };

const storyCalendar =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await serverApi.get(`/user/storyCalendar/${id}`);
      dispatch({ type: 'storyCalendar', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with storyCalendar' });
    }
  };

export const { Provider, Context } = createDataContext(
  userReducer,
  {
    initUser,
    initOtherUser,
    getMyInfo,
    getOtheruser,
    editProfile,
    editProfileImage,
    follow,
    unfollow,
    getMyBookmark,
    getMyContent,
    getMyComment,
    getMyScrab,
    getMyBoardSongs,
    getLikePlaylists,
    addSonginPlaylists,
    deleteSonginPlaylists,
    postStory,
    deleteStory,
    getMyStory,
    getOtherStory,
    storyView,
    storyCalendar,
  },
  {
    myInfo: null,
    myPlayList: null,
    likePlaylists: null,
    otherUser: null,
    boardBookmark: null,
    myContents: null,
    myBoardSongs: null,
    myStory: null,
    otherStory: null,
    storyViewer: [],
    storyCalendar: null,
  },
);
