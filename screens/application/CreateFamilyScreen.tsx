import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import { CreateFamily, UpdateUser } from '../../functions/actions'
import { useState } from 'react'
import { User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import InputTextBlock from '../../components/InputTextBlock'

export default function CreateFamilyScreen({ navigation }: any) {
  const user: User = useSelector((state: RootState) => state.user)

  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function CreateFamilyFunc() {
    setLoading(true)

    if (auth.currentUser && auth.currentUser.email) {
      const id: string =
        auth.currentUser.email.replace('.', ',') + new Date().getTime()

      const data = {
        name: name,
        creator: auth.currentUser.email,
        id: id,
        users: [auth.currentUser.email.replace('.', ',')],
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
      <Header title={'Create family'} action={() => navigation.goBack()} />
      <InputTextBlock
        value={name}
        setValue={(value: string) => setName(value)}
        icon="text-outline"
        type="name"
      />
      <Button
        title="Create family"
        disable={!(name && !loading)}
        action={CreateFamilyFunc}
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
