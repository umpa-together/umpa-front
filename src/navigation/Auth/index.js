import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from 'screens/Auth/SignInScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Signin" component={SignIn} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
