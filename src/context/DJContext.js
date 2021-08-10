import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const DJReducer = (state, action) => {
    switch(action.type) {
        case 'getSimilarTaste':
            return { ...state, tasteDJ: action.payload };
        case 'getWeeklyDJ':
            return { ...state, weeklyDJ: action.payload };
        case 'recommendDJ':
            return { ...state, recommendDJ: action.payload };
        case 'getSongs':
            return { ...state, songs: action.payload };
        case 'error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

const getSimilarTaste = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/SimilarTaste');
        dispatch({ type: 'getSimilarTaste', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getSimilarTaste' });
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

const getSongs = (dispatch) => async ({ id }) => {
    try{
        const response = await serverApi.get('/getSongs/'+id);
        dispatch({ type: 'getSongs', payload: response.data });
    }catch(err){
        dispatch({ type: 'error', payload: 'Something went wrong with getSongs' });
    }
};
const setSongs = (dispatch) => async ({ songs }) => {
    try {
        const response = await serverApi.post('/setSongs', {songs: songs});
        dispatch({ type: 'getSongs', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with setSongs' });
    }
};
const editSongs = (dispatch) => async ({songs}) => {
    try {
        const response = await serverApi.post('/editSongs', {songs: songs});
        dispatch({ type: 'getSongs', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with editSongs' });
    }
};

const recommendDJ = (dispatch) => async() => {
    try {
        const response = await serverApi.get('/recommendDJ');
        dispatch({ type: 'recommendDJ', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with recommendDJ' });
    }
};

const tmp = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/tmp');
        console.log(response.data)
        //dispatch({ type: 'recommendDJ', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with recommendDJ' });
    }
}


export const { Provider, Context } = createDataContext(
    DJReducer,
    { getSimilarTaste, getWeeklyDJ, getSongs, setSongs, editSongs, recommendDJ, tmp },
    { weeklyDJ: [], tasteDJ: [], songs: null, errorMessage: '', recommendDJ: null }
)