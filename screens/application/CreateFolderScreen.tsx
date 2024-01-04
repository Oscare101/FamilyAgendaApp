import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import {
  CreateFamily,
  CreateFolder,
  UpdateFamily,
  UpdateUser,
} from '../../functions/actions'
import { useState } from 'react'
import { Family, Folder, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import InputTextBlock from '../../components/InputTextBlock'

export default function CreateFolderScreen({ navigation }: any) {
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  const [name, setName] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function CreateFamilyFunc() {
    setLoading(true)
    const id: string = family.id + new Date().getTime()

    const newFolder: Folder = {
      name: name,
      id: id,
      data: [],
    }

    await CreateFolder(family.id, newFolder)

    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <BGCircles />
      <Header title={'Create folder'} action={() => navigation.goBack()} />
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
