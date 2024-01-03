import 'react-native-gesture-handler'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import colors from './constants/colors'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './navigation/MainNavigation'

export default function App() {
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(colors.bg)
    NavigationBar.setButtonStyleAsync('dark')
  }, [])

  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  )
}
