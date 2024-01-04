import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import BGCircles from '../../components/BGCircles'
import { Family, Folder, Task, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useMemo, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import InputTextBlock from '../../components/InputTextBlock'
import Button from '../../components/Button'
import { CreateTask } from '../../functions/actions'
import { auth } from '../../firebase'

const width = Dimensions.get('screen').width

export default function FolderScreen({ navigation, route }: any) {
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [400, '100%'], [])

  async function CreateTaskFunc() {
    Keyboard.dismiss()
    setLoading(true)
    if (auth.currentUser && auth.currentUser.email) {
      const newTask: Task = {
        title: title,
        id: new Date().getTime().toString(),
        author: auth.currentUser.email,
        created: new Date().getTime().toString(),
        doneTime: '',
        doneBy: '',
      }
      await CreateTask(family.id, route.params.folderId, newTask)
      setTitle('')
    }
  }

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BGCircles />
        <Header
          title={family.folder[route.params.folderId]?.name}
          action={() => {
            navigation.goBack()
          }}
        />

        <InputTextBlock
          value={title}
          setValue={(value: string) => setTitle(value)}
          icon="text-outline"
          type="text"
        />
        <Button
          title="Add"
          disable={!(title && !loading)}
          action={CreateTaskFunc}
        />
        {/* {family.folder[route.params.folderId].data ? <FlatList data={}  />:<></>} */}
      </View>
    </BottomSheetModalProvider>
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
