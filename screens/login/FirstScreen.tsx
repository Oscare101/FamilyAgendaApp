import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import colors from '../../constants/colors'
import BGCircles from '../../components/BGCircles'
import { useState } from 'react'
import InputTextBlock from '../../components/InputTextBlock'
import Button from '../../components/Button'
import rules from '../../constants/rules'
import { LogIn } from '../../functions/actions'
import { auth } from '../../firebase'
import text from '../../constants/text'
const width = Dimensions.get('screen').width

export default function FirstScreen({ navigation }: any) {
  const language = 'UA'
  return (
    <View style={styles.container}>
      <BGCircles />
      <View style={styles.column}>
        <Text style={styles.title}>Family Agenda</Text>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <Button
            title={text[language].Login}
            disable={false}
            action={() => navigation.navigate('LoginScreen')}
          />
          <Button
            title={text[language].Registration}
            disable={false}
            action={() => navigation.navigate('RegistrationScreen')}
          />
        </View>
        <View />
      </View>
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
  column: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontSize: width * 0.1,
  },
})
