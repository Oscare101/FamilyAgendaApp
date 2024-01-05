import { Dimensions, StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import { CreateFamily, UpdateFamily, UpdateUser } from '../../functions/actions'
import { useEffect, useState } from 'react'
import { Family, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import InputTextBlock from '../../components/InputTextBlock'
import { getDatabase, onValue, ref } from 'firebase/database'

const width = Dimensions.get('screen').width

export default function EnterFamilyScreen({ navigation }: any) {
  const user: User = useSelector((state: RootState) => state.user)

  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  const [families, setFamilies] = useState<any[]>([])

  async function GetUserFamilies() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `family/`)
      onValue(data, (snapshot) => {
        setFamilies(Object.values(snapshot.val()))
      })
    }
  }

  useEffect(() => {
    GetUserFamilies()
  }, [])

  async function EnterFamilyFunc() {
    setLoading(true)
    setError('')
    const foundFamily = families.find(
      (f: Family) => f.name === name && f.password === password
    )

    if (
      foundFamily !== undefined &&
      !foundFamily.users.includes(auth.currentUser?.email?.replace('.', ',')) &&
      auth.currentUser &&
      auth.currentUser.email
    ) {
      const data: Family = {
        ...foundFamily,
        users: [...foundFamily.users, auth.currentUser.email.replace('.', ',')],
      }

      await UpdateFamily(data)

      let userFamiliesId = user?.familiesId || []
      const newUserData: any = {
        familiesId: [...userFamiliesId, foundFamily.id],
        currentFamilyId: foundFamily.id,
      }
      await UpdateUser(auth.currentUser.email, newUserData)
      navigation.goBack()
    } else {
      setError('some error')
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <BGCircles />
      <Header title={'Enter a family'} action={() => navigation.goBack()} />
      <InputTextBlock
        value={name}
        setValue={(value: string) => setName(value)}
        icon="text-outline"
        type="name"
      />
      <InputTextBlock
        value={password}
        setValue={(value: string) => setPassword(value)}
        icon="lock-closed-outline"
        type="password"
      />
      <Text style={styles.error}>{error}</Text>
      <Button
        title="Enter"
        disable={!(name && password && !loading && families.length)}
        action={EnterFamilyFunc}
      />
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
  error: {
    fontSize: width * 0.04,
    color: colors.errorText,
  },
})