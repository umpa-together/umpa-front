import React, { useEffect, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import navigationRef from 'lib/utils/navigation';
import { Context as AuthContext } from 'context/Auth';
import Splash from 'screens/Main/Splash';
// import MainStackScreen from './Main';
import AuthStackScreen from './Auth';
import MainStackScreen from './Main';

const MainNavigator = () => {
  const { state: authState, tryLocalSignIn } = useContext(AuthContext);
  const [isSplash, setIsSplash] = useState(true);

  useEffect(() => {
    tryLocalSignIn();
  }, []);

  if (isSplash) {
    return <Splash setIsSplash={setIsSplash} />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      {authState.token ? <MainStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default MainNavigator;
