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
import Header from '../../components/Header'
const width = Dimensions.get('screen').width

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  async function LogInFunc() {
    setLoading(true)
    const response = await LogIn(email, password)
    if (!response.error) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'MainScreen' }],
      })
    } else {
      setError(response.error)
      setLoading(false)
    }
  }
  return (
    <View style={styles.container}>
      <BGCircles />
      <Header title="" action={() => navigation.goBack()} />

      <View style={styles.column}>
        <Text style={styles.title}>Login</Text>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <InputTextBlock
            icon="person-outline"
            type="email"
            value={email}
            setValue={(value: string) => {
              setEmail(value.replaceAll(' ', ''))
              setError('')
            }}
          />
          <InputTextBlock
            icon="lock-closed-outline"
            type="password"
            value={password}
            setValue={(value: string) => {
              setPassword(value.replaceAll(' ', ''))
              setError('')
            }}
          />
          <Text style={styles.error}>{error}</Text>
          <Button
            title="Login"
            disable={
              !(
                rules.emailTest.test(email) &&
                password.length >= rules.passwordMinLength &&
                !loading
              )
            }
            action={LogInFunc}
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
  error: {
    fontSize: width * 0.04,
    color: colors.errorText,
  },
})