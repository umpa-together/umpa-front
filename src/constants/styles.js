import { StyleSheet } from 'react-native';
import FS, { SCALE_WIDTH } from 'lib/utils/normalize';
import { COLOR_1 } from 'constants/colors';

const style = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spaceEven: {
    justifyContent: 'space-evenly',
  },
  alignCenter: {
    alignItems: 'center',
  },
  space_between: {
    justifyContent: 'space-between',
  },
  icons: {
    width: 40 * SCALE_WIDTH,
    height: 40 * SCALE_WIDTH,
  },
  headertitle: {
    fontSize: FS(18),
    color: COLOR_1,
  },
  background: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default style;
