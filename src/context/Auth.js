import AsyncStorage from '@react-native-async-storage/async-storage';
import server from 'lib/api/server';
import { navigate } from 'lib/utils/navigation';
import createDataContext from 'lib/utils/createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signIn':
      return { errorMessage: '', token: action.payload };
    case 'signUp':
      return { errorMessage: '', token: action.payload };
    case 'signOut':
      return {
        errorMessage: '',
        token: null,
        googleSignup: null,
        kakaoSignup: null,
        naverSignup: null,
      };
    case 'clearErrorMessage':
      return { ...state, errorMessage: '' };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const tryLocalSignIn = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signIn', payload: token });
  } else {
    navigate('Signin');
  }
};

const signUp =
  (dispatch) =>
  async ({ email, password, name, informationagree, songs }) => {
    try {
      const response = await server.post('/signUp', {
        email,
        password,
        name,
        informationagree,
        songs,
      });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signUp', payload: response.data.token });
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
    }
  };

const signIn =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await server.post('/signIn', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signIn', payload: response.data.token });
    } catch (err) {
      dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
    }
  };

const signOut = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signOut' });
  } catch (err) {
    dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
  }
};

const clearErrorMessage = (dispatch) => async () => {
  try {
    dispatch({ type: 'clearErrorMessage' });
  } catch (err) {
    dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
  }
};

const getGoogleInfo =
  (dispatch) =>
  async ({ email, id }) => {
    try {
      const response = await server.get(`/social/google/${email}/${id}`);
      if (response.data[0] === false) {
        navigate('Signup', { email: response.data[1], password: response.data[2], isSNS: true });
      } else {
        const res = await server.post('/signIn', {
          email: response.data[1],
          password: response.data[2],
        });
        await AsyncStorage.setItem('token', res.data.token);
        dispatch({ type: 'signIn', payload: res.data.token });
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
    }
  };

const getAppleInfo =
  (dispatch) =>
  async ({ email, id }) => {
    try {
      const response = await server.get(`/social/apple/${email}/${id}`);
      if (response.data[0] === false) {
        navigate('Signup', { email: response.data[1], password: response.data[2], isSNS: true });
      } else {
        const res = await server.post('/signIn', {
          email: response.data[1],
          password: response.data[2],
        });
        await AsyncStorage.setItem('token', res.data.token);
        dispatch({ type: 'signIn', payload: res.data.token });
        // navigate('Main');
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
    }
  };

const getKakaoInfo =
  (dispatch) =>
  async ({ token }) => {
    try {
      const response = await server.get(`/social/kakao/${token}`);
      if (response.data[0] === false) {
        navigate('Signup', { email: response.data[1], password: response.data[2], isSNS: true });
      } else {
        const res = await server.post('/signIn', {
          email: response.data[1],
          password: response.data[2],
        });
        await AsyncStorage.setItem('token', res.data.token);
        dispatch({ type: 'signIn', payload: res.data.token });
        // navigate('Main');
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
    }
  };

const getNaverInfo =
  (dispatch) =>
  async ({ token }) => {
    try {
      const response = await server.get(`/social/naver/${token}`);
      if (response.data[0] === false) {
        navigate('Signup', { email: response.data[1], password: response.data[2], isSNS: true });
      } else {
        const res = await server.post('/signIn', {
          email: response.data[1],
          password: response.data[2],
        });
        await AsyncStorage.setItem('token', res.data.token);
        dispatch({ type: 'signIn', payload: res.data.token });
        // navigate('Main');
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
    }
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signIn,
    signUp,
    signOut,
    tryLocalSignIn,
    getGoogleInfo,
    getAppleInfo,
    getKakaoInfo,
    getNaverInfo,
    clearErrorMessage,
  },
  { token: null, errorMessage: '', email: '', password: '' },
);
