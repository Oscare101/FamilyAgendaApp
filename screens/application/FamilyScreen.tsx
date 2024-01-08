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
import { Family, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { auth } from '../../firebase'
import { Ionicons } from '@expo/vector-icons'
import text from '../../constants/text'

const width = Dimensions.get('screen').width

export default function FamilyScreen({ navigation }: any) {
  const language = 'UA'
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  const [users, setUsers] = useState<any>({})

  async function GetUsers() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `user/`)
      onValue(data, (snapshot) => {
        setUsers(snapshot.val())
      })
    }
  }

  useEffect(() => {
    GetUsers()
  }, [])

  function RenderFamilyUser({ item }: any) {
    return (
      <View style={styles.rowBetween}>
        <Text numberOfLines={1} style={styles.userItemName}>
          {users![item]!.name}
        </Text>
        {users![item]!.email === family.admin ? (
          <Text numberOfLines={1} style={styles.userItemComment}>
            admin
          </Text>
        ) : family.admin === auth.currentUser?.email ? (
          // <TouchableOpacity
          //   style={{
          //     backgroundColor: colors.errorBG,
          //     height: width * 0.07,
          //     paddingHorizontal: width * 0.03,
          //     borderRadius: width * 0.01,
          //     alignItems: 'center',
          //     justifyContent: 'center',
          //   }}
          // >
          //   <Ionicons
          //     name="person-remove-outline"
          //     size={width * 0.06}
          //     color={colors.errorText}
          //   />
          // </TouchableOpacity>
          <></>
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
        title={family.name}
        action={() => {
          navigation.goBack()
        }}
      />
      <View style={[styles.rowBetween, { width: '92%' }]}>
        <Text style={styles.text}>{text[language].FamilyPassword}:</Text>
        <Text style={styles.text}>{family.password}</Text>
      </View>
      <Text style={styles.comment}>{text[language].FamilyUsers}:</Text>
      <View style={styles.card}>
        {Object.values(users).length ? (
          <FlatList
            style={{ width: '100%' }}
            data={family.users}
            renderItem={RenderFamilyUser}
          />
        ) : (
          <></>
        )}
      </View>
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
  comment: {
    fontSize: width * 0.04,
    color: colors.comment,
    width: '92%',
    textAlign: 'left',
    marginTop: width * 0.03,
  },
  text: {
    fontSize: width * 0.04,
    color: colors.text,
    marginTop: width * 0.03,
  },
  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userItemName: { fontSize: width * 0.05, color: colors.text },
  userItemComment: { fontSize: width * 0.05, color: colors.comment },
})
