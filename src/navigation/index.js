import React, { useEffect, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import navigationRef from 'lib/utils/navigation';
import { Context as AuthContext } from 'context/Auth';
import Splash from 'screens/Main/Splash';
import { StatusBar } from 'react-native';
import HarmfulModal from 'components/Modal/HarmfulModal';
import SearchSongModal from 'components/Modal/SearchSongModal';
import RepresentModal from 'components/Modal/RepresentModal';
import { Provider as AddedProvider } from 'context/Added';
import MainStackScreen from './Main';
import AuthStackScreen from './Auth';

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
      <StatusBar />
      {authState.token ? <MainStackScreen /> : <AuthStackScreen />}
      <HarmfulModal />
      <SearchSongModal />
      <AddedProvider>
        <RepresentModal />
      </AddedProvider>
    </NavigationContainer>
  );
};

export default MainNavigator;
