import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignIn from 'screens/Auth/SignIn';
import SignUp from 'screens/Auth/SignUp';
import SignUpOpt from 'screens/Auth/SignUpOpt';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <AuthStack.Screen name="Signin" component={SignIn} />
    <AuthStack.Screen name="Signup" component={SignUp} />
    <AuthStack.Screen name="Signupopt" component={SignUpOpt} />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
