import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SigninScreen from 'screens/SigninScreen';
import SignupScreen from 'screens/SignupScreen';
import Signupopt from 'screens/Signupopt';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Signin" component={SigninScreen} />
    <AuthStack.Screen name="Signup" component={SignupScreen} />
    <AuthStack.Screen name="Signupopt" component={Signupopt} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
