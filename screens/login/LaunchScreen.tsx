import { Dimensions, StyleSheet, Text, View, StatusBar } from 'react-native'
import colors from '../../constants/colors'
import BGCircles from '../../components/BGCircles'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LogIn } from '../../functions/actions'

const height = Dimensions.get('screen').height

export default function LaunchScreen({ navigation }: any) {
  async function GetData() {
    const email = await AsyncStorage.getItem('email')
    const password = await AsyncStorage.getItem('password')
    if (email !== null && password !== null) {
      const response = await LogIn(email, password)
      if (!response.error) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainScreen' }],
        })
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'FirstScreen' }],
        })
      }
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'FirstScreen' }],
      })
    }
  }

  useEffect(() => {
    GetData()
  }, [])

  return (
    <View style={styles.container}>
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
