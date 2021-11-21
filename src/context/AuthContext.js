import AsyncStorage from '@react-native-community/async-storage';
import server from 'lib/api/server';
import { navigate } from 'navigationRef';
import createDataContext from './createDataContext';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { errorMessage: '', token: action.payload };
    case 'signup':
      return { errorMessage: '', token: action.payload };
    case 'signout':
      return {
        errorMessage: '',
        token: null,
        googleSignup: null,
        kakaoSignup: null,
        naverSignup: null,
      };
    case 'clearError':
      return { ...state, errorMessage: '' };
    case 'doubleCheck':
      return { ...state, doubleCheck: action.payload };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'signin', payload: token });
  } else {
    navigate('Signin');
  }
};

const signup =
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
      dispatch({ type: 'signup', payload: response.data.token });
    } catch (err) {
      dispatch({ type: 'add_error', payload: 'Something went wrong with sign up' });
    }
  };

const signin =
  (dispatch) =>
  async ({ email, password }) => {
    try {
      const response = await server.post('/signIn', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      dispatch({ type: 'signin', payload: response.data.token });
    } catch (err) {
      dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
    }
  };

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem('token');
    dispatch({ type: 'signout' });
  } catch (err) {
    dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
  }
};

const clearErrorMessage = (dispatch) => async () => {
  try {
    dispatch({ type: 'clearError' });
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
        dispatch({ type: 'signin', payload: res.data.token });
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
        dispatch({ type: 'signin', payload: res.data.token });
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
        dispatch({ type: 'signin', payload: res.data.token });
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
        dispatch({ type: 'signin', payload: res.data.token });
        // navigate('Main');
      }
    } catch (err) {
      dispatch({ type: 'add_error', payload: '이메일과 비밀번호가 틀립니다' });
    }
  };

const checkName =
  (dispatch) =>
  async ({ name }) => {
    try {
      const response = await server.get(`/nickName/${name}`);
      dispatch({ type: 'doubleCheck', payload: response.data });
    } catch (err) {
      dispatch({ type: 'error', payload: 'Something went wrong with checkName' });
    }
  };

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    signin,
    signup,
    signout,
    tryLocalSignin,
    getGoogleInfo,
    getAppleInfo,
    getKakaoInfo,
    getNaverInfo,
    clearErrorMessage,
    checkName,
  },
  { token: null, errorMessage: '', email: '', password: '', firstLogin: false, doubleCheck: true },
);
