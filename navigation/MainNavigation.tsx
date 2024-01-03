import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import FirstScreen from '../screens/login/FirstScreen'
import LoginScreen from '../screens/login/LoginScreen'
import RegistrationScreen from '../screens/login/RegistrationScreen'
import MainScreen from '../screens/application/MainScreen'
import { StatusBar } from 'react-native'
import colors from '../constants/colors'

import LaunchScreen from '../screens/login/LaunchScreen'

const Stack = createStackNavigator()

export default function MainNavigation() {
  const navigation = (
    <Stack.Navigator initialRouteName="LaunchScreen">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="LaunchScreen"
        component={LaunchScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
        name="FirstScreen"
        component={FirstScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
      {/* other screens then must apear without bottom tab navigation */}
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
        name="MainScreen"
        component={MainScreen}
      />
    </Stack.Navigator>
  )

  return (
    <>
      <StatusBar barStyle={'dark-content'} backgroundColor={colors.bg} />
      {navigation}
    </>
  )
}
