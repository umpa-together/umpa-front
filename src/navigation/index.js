import React, { useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import navigationRef from 'lib/utils/navigation';
import { Context as AuthContext } from 'context/Auth';
import { StatusBar } from 'react-native';
import MainStackScreen from './Main';
import AuthStackScreen from './Auth';

const MainNavigator = () => {
  const {
    state: { token },
    tryLocalSignIn,
  } = useContext(AuthContext);
  useEffect(() => {
    tryLocalSignIn();
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      {token ? <MainStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default MainNavigator;
