import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import rules from '../constants/rules'

const width = Dimensions.get('screen').width

const data = [
  { icon: 'people-outline', screen: 'FamilyScreen', test: false },
  { icon: 'chatbubble-ellipses-outline', screen: 'ChatScreen', test: true },
  { icon: 'add', screen: 'CreateFamilyScreen', test: true },
]

export default function MainUserCircles({ navigation }: any) {
  return (
    <View style={styles.row}>
      {data
        .filter((d: any) => rules.showTestScreens || !d.test)
        .map((item: any, index: number) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate(item.screen)}
            key={index}
            disabled={item.test}
            style={[styles.button, { opacity: item.test ? 0.5 : 1 }]}
          >
            <Ionicons
              name={item.icon}
              size={width * 0.12}
              color={item.test ? colors.comment : colors.text}
            />
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
    justifyContent:
      data.filter((d: any) => rules.showTestScreens || !d.test).length === 1
        ? 'center'
        : 'space-around',
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
