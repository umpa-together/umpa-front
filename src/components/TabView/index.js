import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView as RNTabView, SceneMap } from 'react-native-tab-view';

export default function TabView({
  idx,
  routesMap,
  renderTabBar,
  sceneMap,
  renderSceneProps,
  ...props
}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(idx || 0);
  const [routes] = useState(routesMap);
  const renderScene = sceneMap && SceneMap(sceneMap);

  return (
    <RNTabView
      props={props}
      navigationState={{ index, routes }}
      renderScene={sceneMap ? renderScene : renderSceneProps}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
}
