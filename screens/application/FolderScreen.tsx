import {
  Animated,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import BGCircles from '../../components/BGCircles'
import { Family, Task, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'

import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { DeleteTask, UpdateAllTasks, UpdateTask } from '../../functions/actions'
import { auth } from '../../firebase'
import { GetLastUpdated, GetSortedTasks } from '../../functions/function'
import { Swipeable } from 'react-native-gesture-handler'
import text from '../../constants/text'
import SwipeTaskRight from '../../components/SwipeTaskRight'
import SwipeTaskLeft from '../../components/SwipeTaskLeft'
import DeleteModal from '../../components/DeleteModal'

const width = Dimensions.get('screen').width

export default function FolderScreen({ navigation, route }: any) {
  const language = 'UA'
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  const [modal, setModal] = useState<any>(null)

  const [swipeableRef, setSwipeableRef] = useState<any>(null)
  let row: Array<any> = []
  let prevOpenedRow: any

  const onSwipeableOpen = (index: any) => {
    if (swipeableRef) {
      swipeableRef.close()
    }
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close()
    }
    prevOpenedRow = row[index]
  }

  function CloseSwipeables() {
    row.forEach((swipeable) => {
      if (swipeable && swipeable.close) {
        swipeable.close()
      }
    })
  }

  function ToggleTaskFunc(item: any) {
    if (auth.currentUser && auth.currentUser.email) {
      const togglesTask = {
        ...item,
        doneBy: item.doneBy ? '' : auth.currentUser.email,
        doneTime: item.doneBy ? '' : new Date().getTime(),
      }

      UpdateTask(family.id, route.params.folderId, togglesTask)
      CloseSwipeables()
    }
  }

  function DeleteTaskFunc(id: any) {
    if (auth.currentUser && auth.currentUser.email) {
      DeleteTask(family.id, route.params.folderId, id)
      CloseSwipeables()
    }
  }

  function ClearDoneTasks() {
    if (!family.folder[route.params.folderId]?.task) return false
    let newTasks: any = {}
    Object.values(family.folder[route.params.folderId].task).forEach(
      (t: Task) => {
        if (!t.doneBy) {
          newTasks[t.id] = t
        }
      }
    )
    UpdateAllTasks(family.id, route.params.folderId, newTasks)
  }

  function RenderTask({ item, index }: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate('CreateTaskScreen', {
            folderId: route.params.folderId,
            task: item,
          })
        }}
        style={{
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          height: width * 0.12,
          marginTop: width * 0.02,
        }}
      >
        <Swipeable
          ref={(ref) => (row[index] = ref)}
          renderRightActions={() => SwipeTaskRight(item)}
          renderLeftActions={() => SwipeTaskLeft(item)}
          overshootLeft={true}
          overshootRight={true}
          overshootFriction={0.2}
          leftThreshold={width * 0.5}
          rightThreshold={width * 0.5}
          friction={0.7}
          onSwipeableOpen={() => {
            onSwipeableOpen(index)
          }}
          onSwipeableWillOpen={(direction: any) => {
            if (direction === 'left') {
              ToggleTaskFunc(item)
            } else {
              setModal(item)
            }
          }}
        >
          <Animated.View style={styles.card}>
            <Text
              numberOfLines={1}
              style={[
                styles.taskTitle,
                {
                  textDecorationLine: item.doneBy ? 'line-through' : 'none',
                  textDecorationStyle: 'solid',
                  textDecorationColor: colors.text,
                },
              ]}
            >
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Text style={{ fontWeight: '300', fontSize: width * 0.03 }}>
                {GetLastUpdated(item.created, language)}
              </Text>
            </View>
            {item.urgent ? (
              <View
                style={{
                  width: width * 0.05,
                  height: width * 0.05,
                  borderRadius: width * 0.05,
                  backgroundColor: item.doneBy
                    ? colors.comment
                    : colors.errorText,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: width * 0.01,
                  right: width * 0.01,
                }}
              >
                <Ionicons
                  name="alert"
                  size={width * 0.03}
                  color={colors.card}
                />
              </View>
            ) : (
              <></>
            )}
          </Animated.View>
        </Swipeable>
      </TouchableOpacity>
    )
  }

  const hintBlock = (
    <View style={[styles.rowBetween, { marginVertical: width * 0.03 }]}>
      <Ionicons
        name="chevron-forward"
        size={width * 0.04}
        color={colors.comment}
      />
      <Ionicons
        name="chevron-forward"
        size={width * 0.04}
        color={colors.comment}
      />
      <Text style={styles.hint}>{text[language].SwipeToToggle}</Text>
      <View style={{ flex: 1 }} />
      <Text style={styles.hint}>{text[language].SwipeToDelete}</Text>
      <Ionicons
        name="chevron-back"
        size={width * 0.04}
        color={colors.comment}
      />
      <Ionicons
        name="chevron-back"
        size={width * 0.04}
        color={colors.comment}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <BGCircles />
      <Header
        title={
          (family.folder && family.folder[route.params.folderId]?.name) || ''
        }
        action={() => {
          navigation.goBack()
        }}
        settings={() => {
          navigation.navigate('CreateFolderScreen', {
            folder: family?.folder![route.params.folderId],
          })
        }}
      />

      {family.folder &&
      family.folder[route.params.folderId]?.task &&
      Object.values(family.folder[route.params.folderId]?.task).length ? (
        <>
          {hintBlock}
          <FlatList
            style={{ width: '100%' }}
            data={GetSortedTasks(family.folder[route.params.folderId].task)}
            renderItem={RenderTask}
            ListFooterComponent={() => <View style={{ height: width * 0.3 }} />}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <Text style={styles.comment}>{text[language].NoTasksYet}</Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          position: 'absolute',
          bottom: width * 0.05,
          zIndex: 2,
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '92%',
          gap: width * 0.05,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={ClearDoneTasks}
          style={{
            flex: 1,
            height: width * 0.2,
            borderRadius: width * 0.2,
            backgroundColor: colors.active,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: width * 0.045, color: colors.text }}>
            {text[language].DeleteAllCompletedTasks}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('CreateTaskScreen', {
              folderId: route.params.folderId,
            })
          }
          style={{
            width: width * 0.2,
            height: width * 0.2,
            borderRadius: width * 0.2,
            backgroundColor: colors.active,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="add" size={width * 0.14} color={colors.bg} />
        </TouchableOpacity>
      </View>
      {/* MODAL */}
      <DeleteModal
        modal={modal}
        title={text[language].DeleteTask}
        description={`${text[language].DoYouWantToDeleteTask} "${
          modal?.title || ''
        }"`}
        onClose={() => {
          setModal(null)
          CloseSwipeables()
        }}
        onDelete={() => {
          DeleteTaskFunc(modal.id)
          setModal(null)
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
    height: width * 0.12,
  },
  taskTitle: {
    fontSize: width * 0.05,
    color: colors.text,
    marginRight: '5%',
  },
  comment: {
    color: colors.comment,
    fontSize: width * 0.05,
    marginTop: width * 0.05,
  },
  hint: {
    fontSize: width * 0.035,
    color: colors.comment,
  },
})
