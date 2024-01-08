import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import FirstScreen from '../screens/login/FirstScreen'
import LoginScreen from '../screens/login/LoginScreen'
import RegistrationScreen from '../screens/login/RegistrationScreen'
import MainScreen from '../screens/application/MainScreen'

import LaunchScreen from '../screens/login/LaunchScreen'
import NewUserScreen from '../screens/login/NewUserScreen'
import CreateFamilyScreen from '../screens/application/CreateFamilyScreen'
import ChatScreen from '../screens/application/ChatScreen'
import FamilyScreen from '../screens/application/FamilyScreen'
import SettingsScreen from '../screens/application/SettingsScreen'
import EnterFamilyScreen from '../screens/application/EnterFamilyScreen'
import CreateFolderScreen from '../screens/application/CreateFolderScreen'
import FolderScreen from '../screens/application/FolderScreen'
import CreateTaskScreen from '../screens/application/CreateTaskScreen'

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
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
        }}
        name="NewUserScreen"
        component={NewUserScreen}
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
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CreateFamilyScreen"
        component={CreateFamilyScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="EnterFamilyScreen"
        component={EnterFamilyScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="ChatScreen"
        component={ChatScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="FamilyScreen"
        component={FamilyScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="SettingsScreen"
        component={SettingsScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CreateFolderScreen"
        component={CreateFolderScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="FolderScreen"
        component={FolderScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerLeft: () => null,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          gestureEnabled: true,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
        name="CreateTaskScreen"
        component={CreateTaskScreen}
      />
    </Stack.Navigator>
  )

  return <>{navigation}</>
}
