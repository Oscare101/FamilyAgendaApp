import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import BGCircles from '../../components/BGCircles'
import { User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { auth } from '../../firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import Button from '../../components/Button'
import { LogOut } from '../../functions/actions'
import text from '../../constants/text'

const width = Dimensions.get('screen').width

export default function SettingsScreen({ navigation }: any) {
  const language = 'UA'
  const user: User = useSelector((state: RootState) => state.user)

  const [families, setFamilies] = useState<any[]>([])
  const [users, setUsers] = useState<any>({})

  const [openFamilies, setOpenFamilies] = useState<any[]>([])

  function LogOutFunc() {
    LogOut()
    navigation.reset({
      index: 0,
      routes: [{ name: 'FirstScreen' }],
    })
  }

  async function GetUserFamilies() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `family/`)
      onValue(data, (snapshot) => {
        setFamilies(
          Object.values(snapshot.val()).filter(
            (f: any) =>
              f.users &&
              f.users.includes(auth.currentUser!.email?.replaceAll('.', ','))
          )
        )
      })
    }
  }

  async function GetUsers() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `user/`)
      onValue(data, (snapshot) => {
        setUsers(snapshot.val())
      })
    }
  }

  useEffect(() => {
    if (user.familiesId?.length) {
      GetUserFamilies()
    }

    GetUsers()
  }, [])

  function RenderUserItem({ item }: any) {
    return (
      <View style={styles.rowBetween}>
        <Text numberOfLines={1} style={styles.userItemName}>
          {users![item.replaceAll('.', ',')]!.name}
        </Text>
      </View>
    )
  }

  function RenderFamilyCardItem({ item }: any) {
    return (
      <View
        style={[
          styles.card,
          {
            borderWidth: 1,
            borderColor:
              item.id === user.currentFamilyId
                ? colors.activeText
                : colors.card,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.rowBetween}
          activeOpacity={0.8}
          onPress={() => {
            if (openFamilies.includes(item.id)) {
              const arr = openFamilies.filter((i: any) => i !== item.id)
              setOpenFamilies(arr)
            } else {
              setOpenFamilies([...openFamilies, item.id])
            }
          }}
        >
          <Text numberOfLines={1} style={styles.familyName}>
            {item.name}
          </Text>
          <Ionicons
            name="chevron-down-outline"
            size={width * 0.07}
            color={colors.text}
          />
        </TouchableOpacity>
        {openFamilies.includes(item.id) ? (
          <>
            <View
              style={{ width: '100%', height: 1, backgroundColor: colors.line }}
            />
            <FlatList
              style={{ width: '100%' }}
              data={item.users}
              renderItem={RenderUserItem}
            />
          </>
        ) : (
          <></>
        )}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BGCircles />
      <Header
        title={text[language].Settings}
        action={() => {
          navigation.goBack()
        }}
      />
      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text numberOfLines={1} style={styles.userName}>
            {user.name}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('NewUserScreen', { user: user })}
          >
            <Ionicons name="pencil" size={width * 0.07} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      </View>
      <Button
        title={text[language].LogOut}
        disable={false}
        action={LogOutFunc}
      />
      <Text style={styles.comment}>{text[language].YourFamilies}:</Text>
      {families.length && Object.values(users).length ? (
        <FlatList
          style={{ width: '100%' }}
          data={[
            ...families.filter((f: any) => f.id === user.currentFamilyId),
            ...families.filter((f: any) => f.id !== user.currentFamilyId),
          ]}
          renderItem={RenderFamilyCardItem}
        />
      ) : (
        <Button
          title={text[language].CreateFamily}
          disable={false}
          action={() => navigation.navigate('CreateFamilyScreen')}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '92%',
    padding: '4%',
    borderRadius: width * 0.03,
    backgroundColor: colors.card,
    marginTop: width * 0.03,
    alignSelf: 'center',
  },
  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: width * 0.07,
    color: colors.text,
    flex: 1,
  },
  userEmail: { fontSize: width * 0.04, color: colors.comment },
  comment: {
    fontSize: width * 0.04,
    color: colors.comment,
    width: '92%',
    textAlign: 'left',
    marginTop: width * 0.03,
  },
  familyName: { fontSize: width * 0.07, color: colors.text, flex: 1 },
  userItemName: { fontSize: width * 0.05, color: colors.text },
})
