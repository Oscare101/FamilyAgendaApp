import { Dimensions, StyleSheet, View } from 'react-native'
import colors from '../constants/colors'

const height = Dimensions.get('screen').height

export default function BGCircles() {
  return (
    <>
      <View
        style={[
          styles.circle,
          {
            top: -height * 0.2,
            right: -height * 0.2,
          },
        ]}
      />
      <View
        style={[
          styles.circle,
          {
            top: height * 0.7,
            right: -height,
          },
        ]}
      />
      <View
        style={[
          styles.circle,
          {
            top: 0,
            right: -height * 2.5,
          },
        ]}
      />
      <View
        style={[
          styles.circle,
          {
            top: -height * 2.8,
            right: -height * 1.2,
          },
        ]}
      />
    </>
  )
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: height * 3,
    height: height * 3,
    borderRadius: height * 1.5,
    borderWidth: 1,
    borderColor: colors.line,
  },
})
