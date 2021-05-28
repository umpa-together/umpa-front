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
const WeekCuration = dispatch => {
    return async () => {
        try {
            await serverApi.post('/WeekCuration');
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with WeekCuration' });
        }
    }
};

const getWeekCuration = dispatch => {
    return async () => {
        try {
            const response = await serverApi.get('/WeekCuration');
            dispatch({ type: 'get_weekcuration', payload: response.data });
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with getWeekCuration' });
        }
    }
};

const postWeekPlaylist = (dispatch) => async () => {
    try {
        await serverApi.post('/WeekPlaylist');
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postWeekPlaylist' });
    }
};

const getWeekPlaylist = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/WeekPlaylist');
        dispatch({ type: 'playlist', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getWeekPlaylist' });
    }
}

const postWeeklyDJ = (dispatch) => async () => {
    try {
        await serverApi.post('/WeekDJ');
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postWeeklyDJ' });
    }
};

const getWeeklyDJ = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/WeekDJ');
        dispatch({ type: 'getWeeklyDJ', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getWeeklyDJ' });
    }
};

export const { Provider, Context } = createDataContext(
    WeeklyReducer,
    { getWeeklyDJ,postWeeklyDJ , WeekCuration , getWeekCuration ,postWeekPlaylist, getWeekPlaylist },
    { weeklyDJ: [], weekcuration: {}, weeklyPlaylist: null, errorMessage: '' }
)