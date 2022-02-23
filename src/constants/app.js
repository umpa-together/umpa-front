const isDev = true;
const DEV_ANDROID = '217008100787-dmpqcjn1lj44u5jr124rhqaomhol8ic6.apps.googleusercontent.com';
const RELEASE_ANDROID = '217008100787-lf4id7vg7l37nn6jrrn94590u4fhgkio.apps.googleusercontent.com';
const DEV_SERVER = 'https://910a-175-193-213-153.ngrok.io';
const RELEASE_SERVER = 'http://52.78.209.215:3000';

export const kConsumerKey = 'so3Gjl6buzJ29rXRalJm';
export const kConsumerSecret = 'hSEE4AQSqf';
export const webClientIdIOS =
  '217008100787-lf4id7vg7l37nn6jrrn94590u4fhgkio.apps.googleusercontent.com';
export const webClientIdAndroid = isDev ? DEV_ANDROID : RELEASE_ANDROID;
export const serverURL = isDev ? DEV_SERVER : RELEASE_SERVER;
