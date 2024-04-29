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
import { Family, User } from './constants/interfaces'
import { onAuthStateChanged } from 'firebase/auth'
import { RootState } from './redux'
import { updateFamily } from './redux/family'

export default function App() {
  function AppComponent() {
    const user: User = useSelector((state: RootState) => state.user)

    const dispatch = useDispatch()
    useEffect(() => {
      NavigationBar.setBackgroundColorAsync(colors.bg)
      NavigationBar.setButtonStyleAsync('dark')
    }, [])

    async function GetAllData() {
      if (auth.currentUser && auth.currentUser.email) {
        const data = ref(
          getDatabase(),
          `user/` + auth.currentUser.email.replaceAll('.', ',')
        )
        onValue(data, (snapshot) => {
          if (snapshot && snapshot.val()) {
            dispatch(updateUser(snapshot.val() as User))
          }
        })
      }
    }

    async function GetFamilyData(id: string) {
      if (auth.currentUser && auth.currentUser.email) {
        // TODO - finish bag (leave family -> delete fanily from bd -> user.currentFamilyId still old and get "ReferenceError: Property 'e' doesn't exist, js engine: hermes" )

        const data = ref(getDatabase(), `family/` + id)
        onValue(data, (snapshot) => {
          if (snapshot && snapshot.val()) {
            dispatch(updateFamily(snapshot.val() as Family))
          }
        })
      }
    }

    useEffect(() => {
      if (user.currentFamilyId) {
        GetFamilyData(user.currentFamilyId)
      }
    }, [user])

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
