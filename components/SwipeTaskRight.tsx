import { Dimensions, View } from 'react-native'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function SwipeTaskRight(item: any) {
  return (
    <View
      style={{
        backgroundColor: colors.errorBG,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '92%',
        height: '100%',
        borderRadius: width * 0.03,
        marginRight: '4%',
        paddingHorizontal: '4%',
      }}
    >
      <Ionicons
        name="chevron-back"
        size={width * 0.05}
        color={colors.errorText}
      />
      <Ionicons
        name="chevron-back"
        size={width * 0.05}
        color={colors.errorText}
      />
      <Ionicons
        name="chevron-back"
        size={width * 0.05}
        color={colors.errorText}
      />
      <Ionicons
        name="trash-bin-outline"
        size={width * 0.07}
        color={colors.errorText}
      />
    </View>
  )
}
