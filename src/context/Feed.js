import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const feedReducer = (state, action) => {
  switch (action.type) {
    case 'getFeeds':
      return { ...state, feed: action.payload, notNextFeed: false, currentFeedPage: 1 };
    case 'nextFeeds':
      return {
        ...state,
        feed: state.feed.concat(action.payload),
        currentFeedPage: state.currentFeedPage + 1,
      };
    case 'notNext':
      return { ...state, notNextFeed: true };
    case 'getFeedType':
      return { ...state, type: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getFeeds = (dispatch) => async () => {
  try {
    const response = await server.get('/feed');
    dispatch({ type: 'getFeeds', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getFeeds' });
  }
};

const nextFeeds =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await server.get(`/feed/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextFeeds', payload: response.data });
      } else {
        dispatch({ type: 'notNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with nextFeeds' });
    }
  };

const getFeedWithFollowing = (dispatch) => async () => {
  try {
    const response = await server.get('/feed/following');
    dispatch({ type: 'getFeeds', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getFeedWithFollowing' });
  }
};
const getNextFeedWithFollowing =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await server.get(`/feed/following/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextFeeds', payload: response.data });
      } else {
        dispatch({ type: 'notNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getNextFeedWithFollowing' });
    }
  };

const getFeedType = (dispatch) => async () => {
  try {
    const feedType = await AsyncStorage.getItem('feedOpt');
    dispatch({ type: 'getFeedType', payload: feedType === null });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getFeedType' });
  }
};

const setFeedType = (dispatch) => async () => {
  try {
    const feedType = await AsyncStorage.getItem('feedOpt');
    if (feedType) {
      await AsyncStorage.removeItem('feedOpt');
      getFeeds();
    } else {
      await AsyncStorage.setItem('feedOpt', 'following');
      getFeedWithFollowing();
    }
    dispatch({ type: 'getFeedType', payload: feedType !== null });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with setFeedType' });
  }
};

export const { Provider, Context } = createDataContext(
  feedReducer,
  { getFeeds, nextFeeds, getFeedWithFollowing, getNextFeedWithFollowing, getFeedType, setFeedType },
  { feed: null, currentFeedPage: 1, notNextFeed: false, type: null, errorMessage: '' },
);
