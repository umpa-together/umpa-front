import createDataContext from './createDataContext';
import serverApi from 'api/serverApi';

const BoardReducer = (state, action) => {
    switch(action.type) {
        case 'initBoard':
            return { ...state, boards: null, currentBoard: null };
        case 'initCurrentBoard':
            return { ...state, currentBoard: null, currentBoardPage: 0 };
        case 'initCurrentContent':
            return { ...state, currentContent: null, currentComment: null, currentCommentPage: 0 };
        case 'initSearchContent':
            return { ...state, searchContent: null };
        case 'initMusic':
            return { ...state, musicArchive: [], musicTime: [], musicChart: [] };
        case 'getBoard':
            return { ...state, boards: action.payload };
        case 'getGenreBoard':
            return { ...state, genreBoard: action.payload };
        case 'getCurrentBoard':
            return { ...state, currentBoard: action.payload, currentBoardPage: 1, boardNotNext: false };
        case 'editContentBoard':
            return { ...state, currentBoard: action.payload };
        case 'nextContents':
            return { ...state, currentBoard: state.currentBoard.concat(action.payload), currentBoardPage: state.currentBoardPage+1 };
        case'boardNotNext':
            return { ...state, boardNotNext: true };
        case 'createContent':
            return { ...state, currentBoard: action.payload, currentBoardPage: 1, boardNotNext: false };
        case 'getCurrentContent':
            return { ...state, currentContent: action.payload[0], currentComment: action.payload[1], currentCommentPage: state.currentCommentPage+1 };
        case 'nextComments':
            return { ...state, currentComment: [...state.currentComment, action.payload[0]], currentCommentPage: state.currentCommentPage+1 };        
        case 'searchContent':
            return { ...state, searchContent: action.payload };
        case 'likeContent':
            return { ...state, currentContent: action.payload };

        case 'createComment':
            return { ...state, currentContent: action.payload[0], currentComment: action.payload[1], currentCommentPage: 0 };
        case 'likeComment':
            return { ...state, currentComment: action.payload };
            
        case 'getMusicArchive':
            return { ...state, musicArchive: action.payload[0], musicTime: action.payload[1] };
        case 'getMusicChart':
            return { ...state, musicChart: action.payload }; 
        case 'addSong':
            return { ...state, musicArchive: [...state.musicArchive, action.payload], ...state.musicTime[action.payload._id] = "0초 전" };
        case 'likeSong':
            return { ...state, musicArchive: action.payload[0], musicChart: action.payload[1] };

        case 'error':
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
};

// initialize

const initBoard = (dispatch) => () => {
    try{
        dispatch({ type: 'initBoard' });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initBoard' });
    }
};

const initCurrentBoard = (dispatch) => () => {
    try{
        dispatch({ type: 'initCurrentBoard' });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initCurrentBoard' });
    }
};

const initCurrentContent = (dispatch) => () => {
    try{
        dispatch({ type: 'initCurrentContent' });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with initCurrentContent' });
    }
};

const initSearchContent = (dispatch) => () => {
    try {
        dispatch({ type: 'initSearchContent' });
    } catch (err) { 
        dispatch({ type: 'error', payload: 'Something went wrong with initSearchContent' });
    }
};

const initMusic = (dispatch) => () => {
    try {
        dispatch({ type: 'initMusic' });
    } catch (err) { 
        dispatch({ type: 'error', payload: 'Something went wrong with initMusic' });
    }
};

// Board

const createBoard = (dispatch) => async ({ name, introduction, genre }) => {
    try {
        await serverApi.post('/createBoard', { name, introduction, genre });
    } catch (err){
        dispatch({ type: 'error', payload: 'Something went wrong with createBoard' });
    }
};

const pushBookmark = (dispatch) => async ({ id }) => {
    try{
        const response = await serverApi.post('/pushBookmark', { id });
        dispatch({ type: 'getBoard' , payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with pushBookmark' });
    }
};

const deleteBookmark = (dispatch) => async ({ id }) => {
    try {
        const response = await serverApi.delete('/deleteBookmark/'+id);
        dispatch({ type: 'getBoard' , payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with deleteBookmark' });
    }
};

const getBoard = (dispatch) => async ({ name }) => {
    try {
        const response = await serverApi.get('/getBoard/'+name);
        dispatch({ type: 'getBoard', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getBoard' });
    }
};

const getSelectedBoard = (dispatch) => async ({ id }) => {
    try {
        const response = await serverApi.get('/getSelectedBoard/'+id);
        dispatch({ type: 'getBoard', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getSelectedBoard' });
    }
};

const getGenreBoard = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/getPopularBoard');
        dispatch({ type: 'getGenreBoard', payload: response.data });     
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getPopularBoard' });
    }
};

const getCurrentBoard = (dispatch) => async ({ boardId }) => {
    try {
        const response = await serverApi.get('/getCurrentBoard/'+boardId);
        dispatch({ type: 'getCurrentBoard', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getCurrentBoard' });
    }
};

const nextContents = (dispatch) => async ({ boardId, page }) => {
    try {
        const response = await serverApi.get('/nextContents/'+boardId+'/'+page);
        if(response.data.length != 0){
            dispatch({ type: 'nextContents', payload: response.data })
        }else{
            dispatch({ type: 'boardNotNext' });
        }
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with nextContents' });
    }
}

// Content

const createContent = (dispatch) => async ({ title, content, boardId, fd, song }) => {
    try {
        const response = await serverApi.post('/createContent', { title, content, boardId, song });
        fd.append('contentId', response.data._id);
        fd.append('boardId', boardId)
        const res = await serverApi.post('/boardImgUpload', fd, { header: {"content-type": "multipart/form-data"}});
        dispatch({ type: 'createContent', payload: res.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with createContent' });
    }
};

const deleteContent = (dispatch) => async ({ contentId, boardId }) => {
    try {
        const response = await serverApi.delete('/deleteContent/'+contentId+'/'+boardId);
        dispatch({ type: 'getCurrentBoard', payload: response.data});
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with deleteContent' });
    }
};

const likeContent = (dispatch) => async ({ contentId }) => {
    try {
        const response = await serverApi.post('/likeContent', { contentId });
        dispatch({ type: 'likeContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with likeContent' });
    }
};

const unlikeContent = (dispatch) => async({ contentId }) => {
    try {
        const response = await serverApi.post('/unlikeContent', { contentId });
        dispatch({ type: 'likeContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with unlikeContent' });
    }
}

const scrabContent = (dispatch) => async ({ id }) => {
    try {
        const response = await serverApi.post('/scrabContent', { id });
        dispatch({ type: 'likeContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with scrabContent' });
    }
};

const deleteScrabContent = (dispatch) => async ({ id }) => {
    try {
        const response = await serverApi.delete('/deleteScrabContent/'+id);
        dispatch({ type: 'likeContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with deleteScrabContent' });
    }
};

const getCurrentContent = (dispatch) => async ({ id }) => {
    try {
        const response = await serverApi.get('/getCurrentContent/'+id);
        dispatch({ type: 'getCurrentContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getCurrentContent' });
    }
};

const nextComments = (dispatch) => async ({ id, page }) => {
    try {
        const response = await serverApi.get('/nextComments/'+id+'/'+page);
        dispatch({ type: 'nextComments', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with nextComments' });
    }
}

const getSearchContent = (dispatch) => async({ id, text }) => {
    try {
        const response = await serverApi.get('/getSearchContent/'+id+'/'+text);
        dispatch({ type: 'searchContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getSearchContent' });
    }
};

// Comment

const createComment = (dispatch) => async ({ comment, contentId }) => {
    try {
        const response = await serverApi.post('/createComment', { comment, contentId });
        dispatch({ type: 'createComment', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with createComment' });
    }
};

const deleteComment = (dispatch) => async ({ contentId, commentId }) => {
    try {
        const response = await serverApi.delete('/deleteComment/'+contentId+'/'+commentId);
        dispatch({ type: 'getCurrentContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with deleteComment' });
    }
};

const createReComment = (dispatch) => async({ comment, contentId, commentId }) => {
    try {
        const response = await serverApi.post('/createReComment', { comment, contentId, commentId });
        dispatch({ type: 'getCurrentContent', payload: response.data });
    } catch (err) { 
        dispatch({ type: 'error', payload: 'Something went wrong with createReComment' });
    }
};

const deleteRecomment = (dispatch) => async({ contentId, commentId }) => {
    try {
        const response = await serverApi.delete('/deleteRecomment/'+contentId+'/'+commentId);
        dispatch({ type: 'getCurrentContent', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with deleteReComment' });
    }
};

const likeComment = (dispatch) => async ({ contentId, commentId }) => {
    try {
        const response = await serverApi.post('/likeComment', { contentId, commentId });
        dispatch({ type: 'likeComment', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with likeComment' });
    }
};

const unlikeComment = (dispatch) => async ({ contentId, commentId }) => {
    try {
        const response = await serverApi.post('/unlikeComment', { contentId, commentId });
        dispatch({ type: 'likeComment', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with unlikeComment' });
    }
}
const likeRecomment = (dispatch) => async ({ contentId, commentId }) => {
    try {
        const response = await serverApi.post('/likeRecomment', { contentId, commentId });
        dispatch({ type: 'likeComment', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with likeRecomment' });
    }
};
const unlikeRecomment = (dispatch) => async ({ contentId, commentId }) => {
    try {
        const response = await serverApi.post('/unlikeRecomment', { contentId, commentId });
        dispatch({ type: 'likeComment', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with unlikeRecomment' });
    }
}

// Song

const addSong = (dispatch) => async ({ boardId, song }) => {
    try {
        const response = await serverApi.post('/addSong', { boardId, song });
        dispatch({ type: 'addSong', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with addSong' });
    }
};

const likeSong = (dispatch) => async ({ id, boardName, boardId }) => {
    try {
        const response = await serverApi.post('/likeSong', { id, boardName, boardId });
        dispatch({ type: 'likeSong', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with likeSong' });
    }
};

const unlikeSong = (dispatch) => async ({ id, boardId }) => {
    try {
        const response = await serverApi.delete('/unlikeSong/'+id+'/'+boardId);
        dispatch({ type: 'likeSong', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with unlikeSong' });
    }
};

const addSongView = (dispatch) => async ({ id, boardId, postUserId }) => {
    try {
        const response = await serverApi.post('/addSongView', { id, boardId, postUserId });
        dispatch({ type: 'getMusicChart', payload: response.data });
    } catch (err) { 
        dispatch({ type: 'error', payload: 'Something went wrong with addSongView' });
    }
};

const getMusicArchive = (dispatch) => async({ boardId }) => {
    try {
        const response = await serverApi.get('/getMusicArchive/'+boardId);
        dispatch({ type: 'getMusicArchive', payload: response.data });
    } catch (err) { 
        dispatch({ type: 'error', payload: 'Something went wrong with getMusicArchive' });
    }
};

const getMusicChart = (dispatch) => async({ boardId }) => {
    try {
        const response = await serverApi.get('/getMusicChart/'+boardId);
        dispatch({ type: 'getMusicChart', payload: response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getMusicChart' });
    }
};

export const { Provider, Context } = createDataContext(
    BoardReducer,
    { initBoard, initCurrentBoard, initCurrentContent, initSearchContent, initMusic, pushBookmark, deleteBookmark,
        createBoard, getBoard, getSelectedBoard, getGenreBoard, getCurrentBoard, nextContents, 
        createContent, deleteContent, likeContent, unlikeContent, scrabContent, deleteScrabContent, getCurrentContent, getSearchContent,
        createComment, deleteComment, createReComment, deleteRecomment, likeComment, unlikeComment, likeRecomment, unlikeRecomment, nextComments,
        addSong, likeSong, unlikeSong, addSongView, getMusicArchive, getMusicChart },
    { boards: null, genreBoard: null, searchContent: null, currentBoard: null, currentContent: null, currentComment: null, 
        musicArchive: null, musicChart: null, musicTime: [], errorMessage: '', currentBoardPage: 0, currentCommentPage: 0, boardNotNext: false }
)