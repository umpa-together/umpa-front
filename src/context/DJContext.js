import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const DJReducer = (state, action) => {
  switch (action.type) {
    case 'recommendDJ':
      return { ...state, recommendDJ: action.payload };
    case 'getSongs':
      return { ...state, songs: action.payload };
    case 'mainRecommendDJ':
      return { ...state, mainRecommendDJ: action.payload };
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const getSongs =
  (dispatch) =>
  async ({ id }) => {
    try {
      const response = await server.get(`/getSongs/${id}`);
      dispatch({ type: 'getSongs', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with getSongs' });
    }
  };
const setSongs =
  (dispatch) =>
  async ({ songs }) => {
    try {
      const response = await server.post('/setSongs', { songs });
      dispatch({ type: 'getSongs', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with setSongs' });
    }
  };
const editSongs =
  (dispatch) =>
  async ({ songs }) => {
    try {
      const response = await server.post('/editSongs', { songs });
      dispatch({ type: 'getSongs', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with editSongs' });
    }
  };

const recommendDJ = (dispatch) => async () => {
  try {
    const response = await server.get('/recommendDJ');
    dispatch({ type: 'recommendDJ', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with recommendDJ' });
  }
};

const getMainRecommendDJ = (dispatch) => async () => {
  try {
    const response = await server.get('/mainRecommend');
    dispatch({ type: 'mainRecommendDJ', payload: response.data });
  } catch (err) {
    dispatch({ type: 'error', payload: 'Something went wrong with recommendDJ' });
  }
};

export const { Provider, Context } = createDataContext(
  DJReducer,
  { getSongs, setSongs, editSongs, recommendDJ, getMainRecommendDJ },
  { songs: null, errorMessage: '', recommendDJ: null, mainRecommendDJ: null },
);
