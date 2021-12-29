import { StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';

const style = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceEven: {
    justifyContent: 'space-evenly',
  },
  alignCenter: {
    alignItems: 'center',
  },
  icons: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
  },
  headerTitle: {
    fontSize: FS(20),
  },
  whiteBack: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default style;
