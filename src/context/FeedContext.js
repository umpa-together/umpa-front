import server from 'lib/api/server';
import createDataContext from './createDataContext';

const feedReducer = (state, action) => {
  switch (action.type) {
    case 'getFeeds':
      return { ...state, feed: action.payload };
    case 'nextFeeds':
      return {
        ...state,
        feed: state.feed.concat(action.payload),
        currentFeedPage: state.currentFeedPage + 1,
      };
    case 'notNext':
      return { ...state, notNext: true };
    default:
      return state;
  }
};

const getFeeds = (dispatch) => async () => {
  try {
    const response = await server.get('/feeds');
    dispatch({ type: 'getFeeds', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getFeeds' });
  }
};

const nextFeeds =
  (dispatch) =>
  async ({ page }) => {
    try {
      const response = await server.get(`/feeds/${page}`);
      if (response.data.length !== 0) {
        dispatch({ type: 'nextFeeds', payload: response.data });
      } else {
        dispatch({ type: 'notNext' });
      }
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with nextFeeds' });
    }
  };

export const { Provider, Context } = createDataContext(
  feedReducer,
  { getFeeds, nextFeeds },
  { feed: null, currentFeedPage: 1, notNext: false },
);
