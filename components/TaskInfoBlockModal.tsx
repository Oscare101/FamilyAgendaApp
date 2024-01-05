import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import colors from '../constants/colors'
import {
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import InputTextBlock from './InputTextBlock'
import { useEffect, useState } from 'react'
import text from '../constants/text'
import { Family, Task } from '../constants/interfaces'
import { auth } from '../firebase'
import { CreateTask } from '../functions/actions'
import family from '../redux/family'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'
import { getDatabase, onValue, ref } from 'firebase/database'
import { GetDateTime } from '../functions/function'

const width = Dimensions.get('screen').width

export default function TaskInfoBlockModal(props: any) {
  const language = 'UA'
  const family: any = useSelector((state: RootState) => state.family)

  const [users, setUsers] = useState<any>({})

  const data = [
    {
      title: 'Urgent',
      value: family.folder[props.folderId].task[props.taskId].urgent
        ? 'yes'
        : 'no',
    },
    {
      title: 'Author',
      value:
        users[
          family.folder[props.folderId].task[props.taskId].author.replace(
            '.',
            ','
          )
        ]?.name,
    },
    {
      title: 'Created',
      value: `${
        GetDateTime(family.folder[props.folderId].task[props.taskId].created)
          .time
      }   ${
        GetDateTime(family.folder[props.folderId].task[props.taskId].created)
          .date
      }`,
    },
  ]

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

  function RenderTaskStat({ item }: any) {
    return (
      <View style={styles.rowBetween}>
        <Text style={{ fontSize: width * 0.05 }}>{item.title}</Text>
        <Text style={{ fontSize: width * 0.05, textAlign: 'right' }}>
          {item.value}
        </Text>
      </View>
    )
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
          borderBottomWidth: 1,
          // borderBlockColor: colors[themeColor].comment,
          height: width * 0.15,
          backgroundColor: colors.card,
          paddingHorizontal: '4%',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={false}
          onPress={props.onEdit}
          style={{
            backgroundColor: colors.text,
            height: width * 0.08,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: width * 0.03,
            borderRadius: width * 0.02,
            opacity: 1,
          }}
        >
          <Text style={{ fontSize: width * 0.05, color: colors.card }}>
            {text[language].Edit}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <View
          style={{
            width: '92%',
            height: width * 0.15,
            backgroundColor: colors.card,
            borderRadius: width * 0.05,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: '4%',
            marginTop: width * 0.05,
            borderWidth: 1,
            borderColor: colors.comment,
          }}
        >
          <Text
            style={{
              fontSize: width * 0.06,
              flex: 1,
              textAlign: 'left',
              marginLeft: props.icon ? '4%' : '0%',
              color: colors.text,
            }}
          >
            {family.folder[props.folderId].task[props.taskId].title}
          </Text>
        </View>
        {/* <View style={styles.rowBetween}>
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
        </View> */}
        {/* <View style={{ flexDirection: 'row' }}>
          <FlatList
            style={{ width: '100%' }}
            horizontal
            scrollEnabled={false}
            data={colorData}
            renderItem={RenderColorItem}
          />
        </View>*/}
        {Object.values(users).length ? (
          <FlatList
            style={{ width: '100%' }}
            scrollEnabled={false}
            data={data}
            renderItem={RenderTaskStat}
          />
        ) : (
          <></>
        )}
      </TouchableWithoutFeedback>
    </>
  )
}

const styles = StyleSheet.create({
  rowBetween: {
    width: width * 0.92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    alignSelf: 'center',
  },
})
