import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native'
import colors from '../constants/colors'
import BGCircles from '../components/BGCircles'

const height = Dimensions.get('screen').height

export default function TestScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.bg} />
      <BGCircles />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
