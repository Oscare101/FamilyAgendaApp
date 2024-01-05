import { Dimensions, View } from 'react-native'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function SwipeTaskLeft(item: any) {
  return (
    <View
      style={{
        backgroundColor: colors.successBG,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '92%',
        height: '100%',
        borderRadius: width * 0.03,
        marginLeft: '4%',
        paddingHorizontal: '4%',
      }}
    >
      <Ionicons
        name={item.doneBy ? 'square-outline' : 'ios-checkbox-outline'}
        size={width * 0.07}
        color={colors.successText}
      />
      <Ionicons
        name="chevron-forward"
        size={width * 0.05}
        color={colors.successText}
      />
      <Ionicons
        name="chevron-forward"
        size={width * 0.05}
        color={colors.successText}
      />
      <Ionicons
        name="chevron-forward"
        size={width * 0.05}
        color={colors.successText}
      />
    </View>
  )
}
