import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import { CreateFamily, UpdateUser } from '../../functions/actions'
import { useState } from 'react'
import { Family, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import InputTextBlock from '../../components/InputTextBlock'
import text from '../../constants/text'
import rules from '../../constants/rules'
import InputLengthBlock from '../../components/InputLenghtBlock'

export default function CreateFamilyScreen({ navigation, route }: any) {
  const language = 'UA'
  const user: User = useSelector((state: RootState) => state.user)

  const [name, setName] = useState<string>(route.params?.family?.name || '')
  const [loading, setLoading] = useState<boolean>(false)

  async function UpdateFamilyFunc() {
    setLoading(true)

    const data: Family = {
      ...route.params?.family,
      name: name,
    }
    await CreateFamily(data)

    navigation.goBack()
  }

  async function CreateFamilyFunc() {
    setLoading(true)

    if (auth.currentUser && auth.currentUser.email) {
      const id: string =
        auth.currentUser.email.replace('.', ',') + new Date().getTime()

      const data: Family = {
        name: name,
        admin: auth.currentUser.email,
        id: id,
        users: [auth.currentUser.email.replace('.', ',')],
        password: Math.random().toString(36).slice(-6),
        folder: [],
      }
      await CreateFamily(data)

      let userFamiliesId = user?.familiesId || []
      const newUserData: any = {
        familiesId: [...userFamiliesId, id],
        currentFamilyId: id,
      }
      await UpdateUser(auth.currentUser.email, newUserData)

      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      <BGCircles />
      <Header
        title={
          route.params?.family?.id
            ? text[language].EditFamily
            : text[language].CreateFamily
        }
        action={() => navigation.goBack()}
      />
      <InputTextBlock
        value={name}
        setValue={(value: string) =>
          setName(value.slice(0, rules.maxFamilyNameLength))
        }
        icon="text-outline"
        type={text[language].name}
      />
      <InputLengthBlock length={name.length} max={rules.maxFamilyNameLength} />
      <Button
        title={
          route.params?.family?.id ? text[language].Save : text[language].Create
        }
        disable={!(name && !loading)}
        action={() => {
          if (route.params?.family?.id) {
            UpdateFamilyFunc()
          } else {
            CreateFamilyFunc()
          }
        }}
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
})
