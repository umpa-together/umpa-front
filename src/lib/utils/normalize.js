import { Dimensions } from 'react-native';

const BASE_WIDTH = 375;
const BASE_HEIGHT = 812;

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const SCALE_WIDTH = DEVICE_WIDTH / BASE_WIDTH;
const SCALE_HEIGHT = DEVICE_HEIGHT / BASE_HEIGHT;

const scale = Math.min(SCALE_WIDTH, SCALE_HEIGHT);

const FS = (size) => Math.ceil(size * scale);

export { SCALE_WIDTH, SCALE_HEIGHT };
export default FS;

/* 
1. 기본적으로 가로는 SCALE_WIDTH 이용
2. 기본적으로 세로는 SCALE_HEIGHT 이용
3. 단, 가로와 세로가 같을 때는 SCALE_WIDTH 이용
4. 폰트는 FS 함수 이용(FS(14)) 
*/
