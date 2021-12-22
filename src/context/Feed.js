import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

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

export const { Provider, Context } = createDataContext(
  feedReducer,
  { getFeeds, nextFeeds },
  { feed: null, currentFeedPage: 1, notNextFeed: false, errorMessage: '' },
);
