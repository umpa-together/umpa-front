import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  navigationRef.current.dispatch(
    CommonActions.navigate({
      name,
      params,
    }),
  );
};

export const push = (name, params) => {
  navigationRef.current.dispatch(StackActions.push(name, params));
};

export const goBack = () => {
  navigationRef.current.dispatch(CommonActions.goBack());
};

export const addListener = (type, callback) => {
  navigationRef.current.addListener(type, callback());
};

export default navigationRef;
