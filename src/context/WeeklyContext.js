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
        case 'getRecentPlaylists':
            return { ...state, recentPlaylists: action.payload }
        case 'getMusicArchive':
            return { ...state, musicArchive: action.payload }
        default:
            return state;
    }
};
const postWeeklyCuration = dispatch => {
    return async () => {
        try {
            await serverApi.post('/WeekCuration');
        }
        catch(err){
            dispatch({ type: 'error', payload: 'Something went wrong with WeekCuration' });
        }
    }
};

const getWeeklyCuration = dispatch => {
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

const postWeeklyPlaylist = (dispatch) => async () => {
    try {
        await serverApi.post('/WeekPlaylist');
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postWeekPlaylist' });
    }
};

const getWeeklyPlaylist = (dispatch) => async () => {
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

const postWeekly = (dispatch) => async () => {
    try {
        await serverApi.post('/Weekly');
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postWeekly' });
    }
}

const getRecentPlaylists = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/recent');
        dispatch({ type: 'getRecentPlaylists', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getRecentPlaylists' });
    }
}

const getMusicArchive = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/musicArchive');
        dispatch({ type: 'getMusicArchive', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMusicArchive' });
    }
}



export const { Provider, Context } = createDataContext(
    WeeklyReducer,
    { getWeeklyDJ, postWeeklyDJ , postWeeklyCuration , getWeeklyCuration, 
        postWeeklyPlaylist, getWeeklyPlaylist, postWeekly, getRecentPlaylists, getMusicArchive },
    { weeklyDJ: [], weekcuration: null, weeklyPlaylist: null, recentPlaylists: null, musicArchive: null, errorMessage: '' }
)
