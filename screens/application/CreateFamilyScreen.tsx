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
        setValue={(value: string) => setName(value)}
        icon="text-outline"
        type={text[language].name}
      />
      <Button
        title={
          route.params?.family?.id ? text[language].Save : text[language].Create
        }
        disable={!(name && !loading)}
        action={UpdateFamilyFunc}
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
