import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../constants/colors'

const width = Dimensions.get('screen').width

interface ButtonProps {
  title: string
  disable: boolean
  action: any
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.action}
      disabled={props.disable}
      style={{
        width: '92%',
        height: width * 0.15,
        backgroundColor: props.disable ? colors.card : colors.active,
        borderRadius: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: width * 0.05,
      }}
    >
      <Text
        style={{
          fontSize: width * 0.07,
          color: props.disable ? colors.comment : colors.text,
        }}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}
