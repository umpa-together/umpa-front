import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from 'screens/Auth/SignInScreen';
import SignUp from 'screens/Auth/SignUpScreen';
import ProfileEdit from 'screens/Main/Account/ProfileEditScreen';

const AuthStack = createNativeStackNavigator();

const screenLists = [
  { title: 'SignIn', component: SignIn },
  { title: 'SignUp', component: SignUp },
  { title: 'ProfileEdit', component: ProfileEdit },
];

const AuthStackScreen = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    {screenLists.map((screen) => {
      const { title, component } = screen;
      return <AuthStack.Screen name={title} component={component} key={title} />;
    })}
  </AuthStack.Navigator>
);

export default AuthStackScreen;
