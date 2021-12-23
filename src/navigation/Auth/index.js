import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from 'screens/Auth/SignInScreen';
import Swipe from 'screens/SwipeScreen';
const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Swipe" component={Swipe} />
    <AuthStack.Screen name="Signin" component={SignIn} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
