import { Dimensions, StyleSheet, Text } from 'react-native'
import colors from '../constants/colors'

const width = Dimensions.get('screen').width

export default function InputLengthBlock(props: any) {
  return (
    <Text style={styles.lengthTitle}>
      {props.length}/{props.max}
    </Text>
  )
}

const styles = StyleSheet.create({
  lengthTitle: {
    fontSize: width * 0.04,
    color: colors.comment,
    width: '92%',
    textAlign: 'right',
  },
})
