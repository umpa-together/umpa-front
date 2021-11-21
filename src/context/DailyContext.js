import { navigate, goBack } from 'lib/utils/navigation';
import server from 'lib/api/server';
import createDataContext from './createDataContext';

const dailyReducer = (state, action) => {
  switch (action.type) {
    case 'init_Daily':
      return { ...state, current_daily: null, current_comments: null, current_songs: [] };
    case 'init_recomment':
      return { ...state, current_recomments: null };
    case 'getAllDailys':
      return {
        ...state,
        allDailys: action.payload,
        notAllDailysNext: false,
        currentAllDailysPage: 1,
      };
    case 'nextAllDailys':
      return {
        ...state,
        allDailys: state.allDailys.concat(action.payload),
        currentAllDailysPage: state.currentAllDailysPage + 1,
      };
    case 'notAllDailysNext':
      return { ...state, notAllDailysNext: true };
    case 'get_Dailys':
      return { ...state, Dailys: action.payload, notNext: false, currentDailyPage: 1 };
    case 'get_Daily':
      return {
        ...state,
        current_daily: action.payload[0],
        current_comments: action.payload[1],
        current_songs: action.payload[0].songs,
      };
    case 'nextDailys':
      return {
        ...state,
        Dailys: state.Dailys.concat(action.payload),
        currentDailyPage: state.currentDailyPage + 1,
      };
    case 'notNext':
      return { ...state, notNext: true };
    case 'deleted_Daily':
      return { ...state, current_daily: [] };
    case 'get_comment':
      return { ...state, current_comments: action.payload };
    case 'add_comment':
      return {
        ...state,
        current_daily: action.payload[0],
        current_comments: action.payload[1],
        current_songs: action.payload[0].songs,
      };
    case 'get_recomment':
      return { ...state, current_recomments: action.payload };
    case 'like':
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
    dispatch({ type: 'init_Daily' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initDaily' });
  }
};

const initRecomment = (dispatch) => () => {
  try {
    dispatch({ type: 'init_recomment' });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with initRecomment' });
  }
};

const getAllDailys = (dispatch) => async () => {
  try {
    const response = await server.get('/daily/all');
    dispatch({ type: 'getAllDailys', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getAllDailys' });
  }
};

const nextAllDailys =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await server.get(`/daily/all/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextAllDailys', payload: response.data });
      } else {
        dispatch({ type: 'notAllDailysNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getAllDailys' });
    }
  };

const addDaily =
  (dispatch) =>
  async ({ textcontent, songs, hashtag, fd }, callback) => {
    try {
      const response = await server.post('/daily', { textcontent, songs, hashtag });
      goBack();
      if (fd._parts.length !== 0) {
        await server.post(`/daily/imgUpload/${response.data}`, fd, {
          header: { 'content-type': 'multipart/form-data' },
        });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addDaily' });
    }
    if (callback) {
      callback();
    }
  };

const editDaily =
  (dispatch) =>
  async ({ textcontent, songs, hashtag, DailyId }, callback) => {
    try {
      await server.post('/daily/edit', { textcontent, songs, hashtag, DailyId });
      navigate('Account');
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addDaily' });
    }
    if (callback) {
      callback();
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
      dispatch({ type: 'like', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likes' });
    }
  };

const unlikesDaily =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.delete(`/daily/like/${id}`);
      dispatch({ type: 'like', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikes' });
    }
  };

const getDailys = (dispatch) => async () => {
  try {
    const response = await server.get('/daily/Dailys');
    dispatch({ type: 'get_Dailys', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getDailys' });
  }
};

const nextDailys =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await server.get(`/Dailys/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextDailys', payload: response.data });
      } else {
        dispatch({ type: 'notNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with nextDailys' });
    }
  };

const getDaily =
  (dispatch) =>
  async ({ id, postUserId }) => {
    try {
      const response = await server.get(`/daily/${id}/${postUserId}`);
      if (response.data[0] == null) {
        dispatch({ type: 'deleted_Daily' });
      } else {
        dispatch({ type: 'get_Daily', payload: response.data });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getDaily' });
    }
  };

// Comment

const addComment =
  (dispatch) =>
  async ({ id, text, noticieduser, noticieduseremail, noticetype, thirdid }) => {
    try {
      const response = await server.post(`/daily/comment/${id}`, {
        text,
        noticieduser,
        noticieduseremail,
        noticetype,
        thirdid,
      });
      dispatch({ type: 'add_comment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addComment' });
    }
  };

const deleteComment =
  (dispatch) =>
  async ({ id, commentid }) => {
    try {
      const response = await server.delete(`/daily/comment/${id}/${commentid}`);
      dispatch({ type: 'get_Daily', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
  };

const addreComment =
  (dispatch) =>
  async ({ id, commentid, text }) => {
    try {
      const response = await server.post(`/daily/recomment/${id}/${commentid}`, { text });
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with addreComment' });
    }
  };

const deletereComment =
  (dispatch) =>
  async ({ commentid }) => {
    try {
      const response = await server.delete(`/daily/recomment/${commentid}`);
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deletereComment' });
    }
  };

const getreComment =
  (dispatch) =>
  async ({ commentid }) => {
    try {
      const response = await server.get(`/daily/recomment/${commentid}`);
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getreComment' });
    }
  };

const likescomment =
  (dispatch) =>
  async ({ dailyid, id }) => {
    try {
      const response = await server.post(`/daily/likecomment/${dailyid}/${id}`);
      dispatch({ type: 'get_comment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likescomment' });
    }
  };

const unlikescomment =
  (dispatch) =>
  async ({ dailyid, id }) => {
    try {
      const response = await server.delete(`/daily/likecomment/${dailyid}/${id}`);
      dispatch({ type: 'get_comment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikescomment' });
    }
  };

const likesrecomment =
  (dispatch) =>
  async ({ commentid, id }) => {
    try {
      const response = await server.post(`/daily/likerecomment/${commentid}/${id}`);
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with likesrecomment' });
    }
  };

const unlikesrecomment =
  (dispatch) =>
  async ({ commentid, id }) => {
    try {
      const response = await server.delete(`/daily/likerecomment/${commentid}/${id}`);
      dispatch({ type: 'get_recomment', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with unlikesrecomment' });
    }
  };

export const { Provider, Context } = createDataContext(
  dailyReducer,
  {
    initDaily,
    getAllDailys,
    nextAllDailys,
    addDaily,
    editDaily,
    deleteDaily,
    likesDaily,
    unlikesDaily,
    getDailys,
    getDaily,
    nextDailys,
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
  },
  {
    allDailys: null,
    notAllDailysNext: false,
    currentAllDailysPage: 1,
    Dailys: null,
    currentDailyPage: 1,
    notNext: false,
    current_daily: null,
    current_comments: null,
    current_songs: [],
    current_recomments: null,
    userDailys: null,
    errorMessage: '',
  },
);
