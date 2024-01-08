import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import { CreateTask, DeleteTask, UpdateTask } from '../../functions/actions'
import { useEffect, useState } from 'react'
import { Family, Folder, Task, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import text from '../../constants/text'
import DeleteModal from '../../components/DeleteModal'
import InputTextBlock from '../../components/InputTextBlock'
import { GetDateTime } from '../../functions/function'
import { getDatabase, onValue, ref } from 'firebase/database'

const width = Dimensions.get('screen').width

export default function CreateTaskScreen({ navigation, route }: any) {
  const language = 'UA'
  const family: Family = useSelector((state: RootState) => state.family)

  const [title, setTitle] = useState<string>(route.params?.task?.title || '')
  const [urgent, setUrgent] = useState<boolean>(
    route.params?.task?.urgent || false
  )

  const [loading, setLoading] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)

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

  const taskStat = [
    {
      title: text[language].Task,
      value: family.folder[route.params?.folderId].task[route.params?.task?.id]
        .urgent
        ? text[language].Urgent
        : text[language].Regular,
      urgent:
        family.folder[route.params?.folderId].task[route.params?.task?.id]
          .urgent,
    },
    {
      title: text[language].Author,
      value:
        users[
          family.folder[route.params?.folderId].task[
            route.params?.task?.id
          ].author.replace('.', ',')
        ]?.name,
    },
    {
      title: text[language].Created,
      value: `${
        GetDateTime(
          family.folder[route.params?.folderId].task[route.params?.task?.id]
            .created
        ).time
      }   ${
        GetDateTime(
          family.folder[route.params?.folderId].task[route.params?.task?.id]
            .created
        ).date
      }`,
    },
    {
      title: text[language].Status,
      value: family.folder[route.params?.folderId].task[route.params?.task?.id]
        .doneBy
        ? text[language].Done
        : text[language].Active,
    },
    {
      title: text[language].Executant,
      value:
        users[
          family.folder[route.params?.folderId].task[
            route.params?.task?.id
          ].doneBy?.replace('.', ',')
        ]?.name || '',
      hide: !family.folder[route.params?.folderId].task[route.params?.task?.id]
        .doneBy,
    },
    {
      title: text[language].DoneTime,
      value: family.folder[route.params?.folderId].task[route.params?.task?.id]
        .doneTime
        ? `${
            GetDateTime(
              family.folder[route.params?.folderId].task[route.params?.task?.id]
                .doneTime
            )?.time
          }   ${
            GetDateTime(
              family.folder[route.params?.folderId].task[route.params?.task?.id]
                .doneTime
            )?.date
          }`
        : '',
      hide: !family.folder[route.params?.folderId].task[route.params?.task?.id]
        .doneBy,
    },
  ]

  function RenderTaskStat({ item }: any) {
    if (item.hide) return <></>
    return (
      <View style={styles.rowBetween}>
        <Text style={{ fontSize: width * 0.05, color: colors.comment }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontSize: width * 0.05,
            color: item.urgent ? colors.errorText : colors.text,
            textAlign: 'right',
          }}
        >
          {item.value}
        </Text>
      </View>
    )
  }

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
        urgent: urgent,
      }
      await CreateTask(family.id, route.params?.folderId, newTask)
      navigation.goBack()
    }
  }

  async function UpdateTaskFunc() {
    Keyboard.dismiss()
    setLoading(true)
    if (auth.currentUser && auth.currentUser.email) {
      const newTask: Task = {
        ...family.folder[route.params?.folderId].task[route.params?.task?.id],
        title: title,
        urgent: urgent,
      }
      await UpdateTask(family.id, route.params?.folderId, newTask)
      navigation.goBack()
    }
  }

  function DeleteTaskFunc() {
    if (auth.currentUser && auth.currentUser.email) {
      DeleteTask(family.id, route.params.folderId, route.params?.task.id)
      setModal(false)
      navigation.goBack()
    }
  }

  return (
    <View style={styles.container}>
      <BGCircles />
      <Header
        title={
          route.params?.task?.id
            ? text[language].UpdateTask
            : text[language].CreateTask
        }
        action={() => navigation.goBack()}
      />

      <InputTextBlock
        value={title}
        setValue={(value: string) => setTitle(value)}
        icon=""
        type={text[language].title}
        style={{ borderWidth: 1, borderColor: colors.comment }}
      />
      <View style={[styles.rowBetween, { width: '92%' }]}>
        <Text style={{ fontSize: width * 0.05, color: colors.text }}>
          {text[language].UrgentTask}
        </Text>
        <Switch
          style={{ transform: [{ scale: 1.2 }] }}
          trackColor={{
            false: colors.comment,
            true: colors.errorBG,
          }}
          thumbColor={urgent ? colors.errorText : colors.comment}
          ios_backgroundColor={colors.comment}
          onValueChange={() => setUrgent(!urgent)}
          value={urgent}
        />
      </View>
      <View style={styles.card}>
        <FlatList
          style={{ width: '100%' }}
          data={taskStat}
          renderItem={RenderTaskStat}
        />
      </View>

      <View style={{ flex: 1 }} />
      {route.params?.task?.id ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setModal(true)
          }}
        >
          <Text style={styles.deleteButton}>{text[language].DeleteTask}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Button
        title={
          route.params?.task?.id ? text[language].Edit : text[language].Create
        }
        disable={!(title && !loading)}
        action={() => {
          if (route.params?.task?.id) {
            UpdateTaskFunc()
          } else {
            CreateTaskFunc()
          }
        }}
        style={{ marginBottom: width * 0.05 }}
      />
      {/* MODAL */}
      <DeleteModal
        modal={modal}
        title={text[language].DeleteTask}
        description={`${text[language].DoYouWantToDeleteTask} "${
          route.params?.task?.title || ''
        }"`}
        onClose={() => {
          setModal(false)
        }}
        onDelete={() => {
          DeleteTaskFunc()
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
  deleteButton: {
    fontSize: width * 0.05,
    color: colors.errorText,
  },
  rowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignSelf: 'center',
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
})
