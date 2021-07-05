import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const WeeklyReducer = (state, action) => {
    switch(action.type) {
        case 'playlist':
            return { ...state, weeklyPlaylist: action.payload };
        case 'error':
            return { ...state, errorMessage: action.payload };
        case 'getWeeklyDJ':
            return { ...state, weeklyDJ: action.payload };
        case 'get_weekcuration':
            return { ...state, weekcuration:action.payload };
        default:
            return state;
    }
};
const postWeeklyCuration = dispatch => {
    return async () => {
        try {
            await serverApi.post('/WeeklyCuration');
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with WeekCuration' });
        }
    }
};

const getWeeklyCuration = dispatch => {
    return async () => {
        try {
            const response = await serverApi.get('/WeeklyCuration');
            dispatch({ type: 'get_weekcuration', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getWeekCuration' });
        }
    }
};

const postWeeklyPlaylist = (dispatch) => async () => {
    try {
        await serverApi.post('/WeeklyPlaylist');
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postWeekPlaylist' });
    }
};

const getWeeklyPlaylist = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/WeeklyPlaylist');
        dispatch({ type: 'playlist', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getWeekPlaylist' });
    }
}

const postWeeklyDJ = (dispatch) => async () => {
    try {
        await serverApi.post('/WeeklyDJ');
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postWeeklyDJ' });
    }
};

const getWeeklyDJ = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/WeeklyDJ');
        dispatch({ type: 'getWeeklyDJ', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getWeeklyDJ' });
    }
};

const postWeekly = (dispatch) => async () => {
    try {
        await serverApi.post('/Weekly');
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postWeekly' });
    }
}

export const { Provider, Context } = createDataContext(
    WeeklyReducer,
    { getWeeklyDJ, postWeeklyDJ , postWeeklyCuration , getWeeklyCuration, postWeeklyPlaylist, getWeeklyPlaylist, postWeekly },
    { weeklyDJ: [], weekcuration: {}, weeklyPlaylist: null, errorMessage: '' }
)