import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import colors from '../constants/colors'
import { auth } from '../firebase'
import { useEffect, useState } from 'react'
import text from '../constants/text'
import { GetDateTime } from '../functions/function'
import { getDatabase, onValue, ref } from 'firebase/database'
import { Family } from '../constants/interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'

const width = Dimensions.get('screen').width

export default function TaskStatBlock(props: any) {
  const language = 'UA'
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

  const taskStat = [
    {
      title: text[language].Task,
      value: family.folder[props.folderId].task[props.taskId].urgent
        ? text[language].Urgent
        : text[language].Regular,
      urgent: family.folder[props.folderId].task[props.taskId].urgent,
    },
    {
      title: text[language].Author,
      value:
        users[
          family.folder[props.folderId].task[props.taskId].author.replaceAll(
            '.',
            ','
          )
        ]?.name,
    },
    {
      title: text[language].Created,
      value: `${
        GetDateTime(family.folder[props.folderId].task[props.taskId].created)
          .time
      }   ${
        GetDateTime(family.folder[props.folderId].task[props.taskId].created)
          .date
      }`,
    },
    {
      title: text[language].Status,
      value: family.folder[props.folderId].task[props.taskId].doneBy
        ? text[language].Done
        : text[language].Active,
    },
    {
      title: text[language].Executant,
      value:
        users[
          family.folder[props.folderId].task[props.taskId].doneBy?.replaceAll(
            '.',
            ','
          )
        ]?.name || '',
      hide: !family.folder[props.folderId].task[props.taskId].doneBy,
    },
    {
      title: text[language].DoneTime,
      value: family.folder[props.folderId].task[props.taskId].doneTime
        ? `${
            GetDateTime(
              family.folder[props.folderId].task[props.taskId].doneTime
            )?.time
          }   ${
            GetDateTime(
              family.folder[props.folderId].task[props.taskId].doneTime
            )?.date
          }`
        : '',
      hide: !family.folder[props.folderId].task[props.taskId].doneBy,
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

  return (
    <View style={styles.card}>
      <FlatList
        style={{ width: '100%' }}
        data={taskStat}
        renderItem={RenderTaskStat}
      />
    </View>
  )
}

const styles = StyleSheet.create({
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
