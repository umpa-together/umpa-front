import server from 'lib/api/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from 'lib/utils/createDataContext';

const NoticeReducer = (state, action) => {
  switch (action.type) {
    case 'getNotice':
      return { ...state, notice: action.payload, notNextNotice: false, currentNoticePage: 1 };
    case 'nextNotice':
      return {
        ...state,
        notice: state.notice.concat(action.payload),
        currentNoticePage: state.currentNoticePage + 1,
      };
    case 'notNext':
      return { ...state, notNextNotice: true };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getNotice = (dispatch) => async () => {
  try {
    const response = await server.get('/notice');
    dispatch({ type: 'getNotice', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getNotice' });
  }
};

const getNextNotice =
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
      dispatch({ type: 'error', payload: 'Something went wrong with getNextNotice' });
    }
  };

const readNotice =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.put(`/notice/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with readNotice' });
    }
  };

const setNoticeToken = (dispatch) => async () => {
  try {
    const noticetoken = await AsyncStorage.getItem('noticetoken');
    await server.put(`/notice/token/${noticetoken}`);
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with setNoticeToken' });
  }
};

const deleteNoticeToken = (dispatch) => async () => {
  try {
    await server.delete('/notice');
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with deleteNoticeToken' });
  }
};

export const { Provider, Context } = createDataContext(
  NoticeReducer,
  { getNotice, getNextNotice, readNotice, setNoticeToken, deleteNoticeToken },
  { notice: null, errorMessage: '', currentNoticePage: 1, notNextNotice: false },
);
