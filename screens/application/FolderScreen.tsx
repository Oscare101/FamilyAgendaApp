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
import BottomModalBlock from '../../components/BottomModalBlock'
import { GetDateTime, GetLastUpdated } from '../../functions/function'

const width = Dimensions.get('screen').width

export default function FolderScreen({ navigation, route }: any) {
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['100%'], []) // TODO

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

  function RenderTask({ item }: any) {
    return (
      <View style={styles.card}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Text>{GetLastUpdated(item.created)}</Text>
        </View>
      </View>
    )
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

        {/* <InputTextBlock
          value={title}
          setValue={(value: string) => setTitle(value)}
          icon="text-outline"
          type="text"
        />
        <Button
          title="Add"
          disable={!(title && !loading)}
          action={CreateTaskFunc}
        /> */}
        <View style={styles.rowBetween}>
          <Button
            title="Add"
            disable={false}
            action={() => {
              // bottomSheetModalRef.current?.present()
            }}
            style={{ width: '49%' }}
          />
          <Button
            title="Add"
            disable={false}
            action={() => {
              bottomSheetModalRef.current?.present()
            }}
            style={{ width: '49%' }}
          />
        </View>

        {family.folder[route.params.folderId]?.task &&
        Object.values(family.folder[route.params.folderId]?.task).length ? (
          <FlatList
            style={{ width: '100%' }}
            data={Object.values(family.folder[route.params.folderId].task).sort(
              (a: Task, b: Task) => +b.created - +a.created
            )}
            renderItem={RenderTask}
          />
        ) : (
          <></>
        )}
      </View>
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={() => bottomSheetModalRef.current?.dismiss()}
        content={'taskBlock'}
        setTitle={(value: string) => setTitle(value)}
        title={setTitle}
      />
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
  rowBetween: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  card: {
    width: '92%',
    backgroundColor: colors.card,
    flexDirection: 'column',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: width * 0.03,
    padding: width * 0.02,
  },
  taskTitle: {
    fontSize: width * 0.05,
  },
})
