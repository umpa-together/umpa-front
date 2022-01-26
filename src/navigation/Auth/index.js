import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from 'screens/Auth/SignInScreen';
import SignUp from 'screens/Auth/SignUpScreen';
import ProfileEdit from 'screens/Main/Account/ProfileEditScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
    <AuthStack.Screen name="ProfileEdit" component={ProfileEdit} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
