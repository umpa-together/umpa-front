import createDataContext from './createDataContext';
import serverApi from '../api/serverApi';

const chatReducer = (state, action) => {
    switch(action.type) {
        case 'post_Chat':
            return { ...state, chatroom: action.payload };  
        case 'send_Msg':
            return { ...state, chatroom: action.payload };                       
        default:
            return state;
    }
};

const postChat = (dispatch) => async ({participate}) => {
    try {
        const response = await serverApi.post('/chat', {participate});
        dispatch({ type: 'post_Chat', payload:response.data });

    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });
    }
}

const gotoChat = (dispatch) => async ({chatid}) => {
    try {
        const response = await serverApi.get('/gotochat/'+chatid);
        dispatch({ type: 'post_Chat', payload:response.data });

    } catch (err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });
    }
}
const sendMsg = (dispatch) => async ({ type, text, chatid}) =>{
    try{
        const response = await serverApi.post('/chatmsg', {type, text, chatid});
        dispatch({ type: 'send_Msg', payload:response.data });

    } catch(err) {
        dispatch({ type: 'error', payload: 'Something went wrong with report' });

    }

}

export const { Provider, Context } = createDataContext(
    chatReducer,
    { postChat,gotoChat,sendMsg },
    {  chatroom:null,}
);