import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const storyReducer = (state, action) => {
  switch (action.type) {
    case 'postStory':
      return { ...state, myStory: action.payload };
    case 'deletStory':
      return { ...state, myStory: null };
    case 'getMyStory':
      return { ...state, myStory: action.payload[0], storyViewer: action.payload[1] };
    case 'otherStoryLists':
      return { ...state, otherStoryLists: action.payload };
    case 'getStoryCalendar':
      return { ...state, storyCalendar: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const postStory =
  (dispatch) =>
  async ({ song }) => {
    try {
      const response = await server.post('/story', { song });
      dispatch({ type: 'postStory', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postStory' });
    }
  };

const deleteStory =
  (dispatch) =>
  async ({ storyId }) => {
    try {
      await server.delete(`/story/${storyId}`);
      dispatch({ type: 'deletStory' });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with deleteStory' });
    }
  };

const getMyStory = (dispatch) => async () => {
  try {
    const response = await server.get('/story');
    dispatch({ type: 'getMyStory', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getMyStory' });
  }
};

const getOtherStoryWithAll = (dispatch) => async () => {
  try {
    const response = await server.get('/story/other');
    dispatch({ type: 'otherStoryLists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getOtherStoryWithAll' });
  }
};

const getOtherStoryWithFollower = (dispatch) => async () => {
  try {
    const response = await server.get('/story/following');
    dispatch({ type: 'otherStoryLists', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with getOtherStoryWithFollower' });
  }
};

const readStory =
  (dispatch) =>
  async ({ id }) => {
    try {
      await server.put(`/story/${id}`);
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with readStory' });
    }
  };

const getStoryCalendar =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/story/calender/${id}`);
      dispatch({ type: 'getStoryCalendar', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getStoryCalendar' });
    }
  };

export const { Provider, Context } = createDataContext(
  storyReducer,
  {
    postStory,
    deleteStory,
    getMyStory,
    getOtherStoryWithAll,
    getOtherStoryWithFollower,
    readStory,
    getStoryCalendar,
  },
  {
    myStory: null,
    otherStoryLists: null,
    storyViewer: [],
    storyCalendar: null,
    errorMessage: '',
  },
);
