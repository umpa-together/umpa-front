import createDataContext from './createDataContext';
import serverApi from 'api/serverApi';

const reportReducer = (state, action) => {
    switch(action.type) {
        default:
            return state;
    }
};

const postReport = (dispatch) => async ({type, reason, subjectId}) => {
    try {
        await serverApi.post('/report', {type, reason, subjectId});
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });
    }
}

export const { Provider, Context } = createDataContext(
    reportReducer,
    { postReport },
    {  }
);