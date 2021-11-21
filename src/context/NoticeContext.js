import server from 'lib/api/server';
import AsyncStorage from '@react-native-community/async-storage';
import createDataContext from './createDataContext';

const NoticeReducer = (state, action) => {
  switch (action.type) {
    case 'get_notice':
      return { ...state, notice: action.payload, currentNoticePage: 1, notNext: false };
    case 'nextNotice':
      return {
        ...state,
        notice: state.notice.concat(action.payload),
        currentNoticePage: state.currentNoticePage + 1,
      };
    case 'set_token':
      return { ...state, token: action.payload };
    case 'notNext':
      return { ...state, notNext: true };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getnotice = (dispatch) => async () => {
  try {
    const response = await server.get('/notice');
    dispatch({ type: 'get_notice', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
  }
};

const nextNotice =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await server.get(`/notice/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextNotice', payload: response.data });
      } else {
        dispatch({ type: 'notNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with nextNotice' });
    }
  };

const readNotice =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.put(`/notice/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
    }
  };

const setnoticetoken = (dispatch) => async () => {
  try {
    const noticetoken = await AsyncStorage.getItem('noticetoken');
    await server.put(`/notice/setnotice/${noticetoken}`);
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
  }
};

const deletenoticetoken = (dispatch) => async () => {
  try {
    await server.delete('/notice');
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with SearchHashtag' });
  }
};

export const { Provider, Context } = createDataContext(
  NoticeReducer,
  { deletenoticetoken, getnotice, readNotice, setnoticetoken, nextNotice },
  { notice: null, errorMessage: '', currentNoticePage: 0, notNext: false },
);
