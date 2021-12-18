import {
  createNavigationContainerRef,
  CommonActions,
  StackActions,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

export const navigate = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(
      CommonActions.navigate({
        name,
        params,
      }),
    );
  }
};

export const push = (name, params) => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(StackActions.push(name, params));
  }
};

export const goBack = () => {
  if (navigationRef.current) {
    navigationRef.current.dispatch(CommonActions.goBack());
  }
};

export const addListener = (type, callback) => {
  if (navigationRef.current) {
    navigationRef.current.addListener(type, callback());
  }
};

export default navigationRef;
