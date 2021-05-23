import { Dimensions } from 'react-native';

const tmpWidth = Dimensions.get('window').width /375;
const tmpHeight = Dimensions.get('window').height / 812;

export { tmpWidth, tmpHeight };