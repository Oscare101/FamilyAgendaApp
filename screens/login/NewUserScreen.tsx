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
import { LogIn, Registration, UpdateUser } from '../../functions/actions'
import { auth } from '../../firebase'
import Header from '../../components/Header'
const width = Dimensions.get('screen').width

export default function NewUserScreen({ navigation, route }: any) {
  const [name, setName] = useState<string>(route.params?.user?.name || '')
  const [loading, setLoading] = useState<boolean>(false)

  async function UpdateUserFunc() {
    setLoading(true)
    const data = {
      name: name,
    }
    if (auth.currentUser && auth.currentUser.email) {
      await UpdateUser(auth.currentUser.email, data)
      if (route.params?.user?.name) {
        navigation.goBack()
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainScreen' }],
        })
      }
    }
  }

  return (
    <View style={styles.container}>
      <BGCircles />
      <Header title="" action={() => navigation.goBack()} />

      <View style={styles.column}>
        <Text style={styles.title}>
          {route.params?.user?.name ? 'Edit Name' : 'New account'}
        </Text>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <InputTextBlock
            icon="person-outline"
            type="name"
            value={name}
            setValue={(value: string) => {
              setName(value)
            }}
          />

          <Button
            title={route.params?.user?.name ? 'Edit' : 'Create account'}
            disable={!(name && !loading)}
            action={UpdateUserFunc}
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
