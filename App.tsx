import 'react-native-gesture-handler'
import { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import colors from './constants/colors'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigation from './navigation/MainNavigation'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { StatusBar } from 'react-native'
import { auth } from './firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { useDispatch, useSelector } from 'react-redux'
import { updateUser } from './redux/user'
import { User } from './constants/interfaces'
import { onAuthStateChanged } from 'firebase/auth'

export default function App() {
  function AppComponent() {
    const dispatch = useDispatch()
    useEffect(() => {
      NavigationBar.setBackgroundColorAsync(colors.bg)
      NavigationBar.setButtonStyleAsync('dark')
    }, [])

    async function GetAllData() {
      if (auth.currentUser && auth.currentUser.email) {
        const data = ref(
          getDatabase(),
          `user/` + auth.currentUser.email.replace('.', ',')
        )
        onValue(data, (snapshot) => {
          dispatch(updateUser(snapshot.val() as User))
        })
      }
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user && user.email) {
          GetAllData()
        }
      })

      return () => {
        unsubscribe()
      }
    }, [auth])

    return (
      <>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.bg} />
      </>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppComponent />
        <MainNavigation />
      </NavigationContainer>
    </Provider>
  )
}
