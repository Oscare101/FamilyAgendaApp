import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

interface HeaderProps {
  title: string
  action: any
}

export default function ProfileHeader(props: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.action}
        style={styles.button}
      >
        <Ionicons
          name="settings-outline"
          size={width * 0.09}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: width * 0.1,
    marginBottom: width * 0.07,
  },
  button: {
    height: width * 0.1,
    width: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.07,
    color: colors.text,
  },
})
