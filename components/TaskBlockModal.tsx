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
import { useState } from 'react'
import text from '../constants/text'
import { Family, Task } from '../constants/interfaces'
import { auth } from '../firebase'
import { CreateTask, UpdateTask } from '../functions/actions'
import { useSelector } from 'react-redux'
import { RootState } from '../redux'

const width = Dimensions.get('screen').width

export default function TaskBlockModal(props: any) {
  const language = 'UA'
  const family: Family = useSelector((state: RootState) => state.family)
  const [title, setTitle] = useState<string>(
    props.taskId ? family.folder[props.folderId].task[props.taskId].title : ''
  )
  const [urgent, setUrgent] = useState<boolean>(
    props.taskId
      ? family.folder[props.folderId].task[props.taskId].urgent
      : false
  )
  const [loading, setLoading] = useState<boolean>(false)

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
      await CreateTask(props.familyId, props.folderId, newTask)
      props.dismiss()
    }
  }

  async function UpdateTaskFunc() {
    Keyboard.dismiss()
    setLoading(true)
    if (auth.currentUser && auth.currentUser.email) {
      const newTask: Task = {
        ...family.folder[props.folderId].task[props.taskId],
        title: title,
        urgent: urgent,
      }
      await UpdateTask(props.familyId, props.folderId, newTask)
      props.dismiss()
    }
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
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
          onPress={() => {
            if (props.taskId) {
              props.onBack()
            } else {
              setTitle('')
            }
          }}
        >
          <Text style={{ fontSize: width * 0.05, color: colors.errorText }}>
            {props.taskId ? text[language].Back : text[language].Clear}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={!(title && !loading)}
          onPress={() => {
            if (props.taskId) {
              UpdateTaskFunc()
            } else {
              CreateTaskFunc()
            }
          }}
          style={{
            backgroundColor: colors.text,
            height: width * 0.08,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: width * 0.03,
            borderRadius: width * 0.02,
            opacity: !(title && !loading) ? 0.3 : 1,
          }}
        >
          <Text style={{ fontSize: width * 0.05, color: colors.card }}>
            {props.taskId ? text[language].Edit : text[language].Save}
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
        <InputTextBlock
          value={title}
          setValue={(value: string) => setTitle(value)}
          icon=""
          type={text[language].title}
          style={{ borderWidth: 1, borderColor: colors.comment }}
        />
        <View style={styles.rowBetween}>
          <Text style={{ fontSize: width * 0.05, color: colors.text }}>
            {text[language].UrgentTask}
          </Text>
          {/* <Text style={{ fontSize: width * 0.05, color: colors.text }}>1</Text> */}
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
        {/* <View style={{ flexDirection: 'row' }}>
          <FlatList
            style={{ width: '100%' }}
            horizontal
            scrollEnabled={false}
            data={colorData}
            renderItem={RenderColorItem}
          />
        </View>
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <FlatList
            style={{ width: '100%' }}
            scrollEnabled={false}
            numColumns={5}
            data={iconData}
            renderItem={RenderIconItem}
          />
        </ScrollView> */}
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
