import server from 'lib/api/server';
import createDataContext from 'lib/utils/createDataContext';

const reportReducer = (state, action) => {
  switch (action.type) {
    case 'error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const postReport =
  (dispatch) =>
  async ({ type, reason, subjectId }) => {
    try {
      await server.post('/report', { type, reason, subjectId });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with postReport' });
    }
  };

export const { Provider, Context } = createDataContext(
  reportReducer,
  { postReport },
  { errorMessage: '' },
);
