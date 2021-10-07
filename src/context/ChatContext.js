import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const chatReducer = (state, action) => {
    switch(action.type) {
        case 'post_Chat':
            return { ...state, chatroom: action.payload };  
        case 'block_Chat' : 
            return { ...state, chatroom: action.payload };
        case 'receive_Msg':
            return { ...state, chatroom: action.payload };      
        case 'get_list' : 
            return { ...state, chatlist: action.payload };
        case 'getMessagesNum':
            return { ...state, unReadMessagesNum: action.payload.messagesNum };
        default:
            return state;
    }
};

const profileChat = (dispatch) => async ({ participate }) => {
    try {
        const response = await serverApi.post('/chat', { participate });
        dispatch({ type: 'post_Chat', payload:response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with postChat' });
    }
}

const getSelectedChat = (dispatch) => async ({ chatid }) => {
    try {
        const response = await serverApi.get('/selectedChat/'+chatid);
        dispatch({ type: 'post_Chat', payload:response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getSelectedChat' });
    }
}

const getChatList = (dispatch) => async () =>{
    try{
        const response = await serverApi.get('/chatList');
        dispatch({ type: 'get_list', payload:response.data });
    } catch(err) {
        dispatch({ type: 'error', payload: 'Something went wrong with getChatList' });
    }
}

const receiveMsg = (dispatch) => async ({ chat }) =>{
    try{
        dispatch({ type: 'receive_Msg', payload: chat });
    } catch(err) {
        dispatch({ type: 'error', payload: 'Something went wrong with receiveMsg' });
    }
}

const blockchat = (dispatch) => async ({ chatid }) => {
    try {
        const response = await serverApi.post('/blockchat', {chatid});
        dispatch({ type: 'block_Chat', payload:response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with blockchat' });
    }
}

const unblockchat = (dispatch) => async ({ chatid }) => {
    try {
        const response = await serverApi.post('/unblockchat', {chatid});
        dispatch({ type: 'block_Chat', payload:response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with unblockchat' });
    }
}

const getMessagesNum = (dispatch) => async () => {
    try {
        const response = await serverApi.get('/messages');
        dispatch({ type: 'getMessagesNum', payload:response.data });
    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with unblgetMessagesNumockchat' });
    }
}

export const { Provider, Context } = createDataContext(
    chatReducer,
    { profileChat, getSelectedChat, getChatList, receiveMsg, blockchat, unblockchat, getMessagesNum },
    {  chatroom: null, chatlist: null, unReadMessagesNum: 0 }
);