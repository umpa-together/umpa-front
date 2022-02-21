import React, { useEffect, useContext, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import navigationRef from 'lib/utils/navigation';
import { Context as AuthContext } from 'context/Auth';
import { StatusBar } from 'react-native';
import analytics from '@react-native-firebase/analytics';
import TrackPlayerInitializer from 'lib/utils/trackPlayer';
import MainStackScreen from './Main';
import AuthStackScreen from './Auth';

const MainNavigator = () => {
  const routeNameRef = useRef();
  const {
    state: { token },
    tryLocalSignIn,
  } = useContext(AuthContext);

  useEffect(() => {
    tryLocalSignIn();
    TrackPlayerInitializer();
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <StatusBar backgroundColor="transparent" translucent barStyle="dark-content" />
      {token ? <MainStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default MainNavigator;
