import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import { LogOut } from '../../functions/actions'

export default function MainScreen({ navigation }: any) {
  function LogOutFunc() {
    LogOut()
    navigation.reset({
      index: 0,
      routes: [{ name: 'FirstScreen' }],
    })
  }

  return (
    <View style={styles.container}>
      <BGCircles />

      <Text>{auth.currentUser?.email}</Text>
      <Button title="LogOut" disable={false} action={LogOutFunc} />
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
