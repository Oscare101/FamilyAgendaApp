import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

const data = [
  { icon: 'people-outline', screen: 'FamilyScreen' },
  { icon: 'chatbubble-ellipses-outline', screen: 'ChatScreen' },
  { icon: 'add', screen: 'CreateFamilyScreen' },
]

export default function MainUserCircles({ navigation }: any) {
  return (
    <View style={styles.row}>
      {data.map((item: any, index: number) => (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate(item.screen)}
          key={index}
          style={styles.button}
        >
          <Ionicons name={item.icon} size={width * 0.12} color={colors.text} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    width: width * 0.25,
    height: width * 0.25,
    borderRadius: width * 0.25,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
