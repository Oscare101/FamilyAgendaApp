import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
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
import Button from '../../components/Button'
import { CreateTask, DeleteTask, UpdateTask } from '../../functions/actions'
import { auth } from '../../firebase'
import BottomModalBlock from '../../components/BottomModalBlock'
import { GetLastUpdated, GetSortedTasks } from '../../functions/function'
import { Swipeable } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import text from '../../constants/text'
import DeleteTaskModal from '../../components/DeleteTaskModal'
import SwipeTaskRight from '../../components/SwipeTaskRight'
import SwipeTaskLeft from '../../components/SwipeTaskLeft'

const width = Dimensions.get('screen').width

export default function FolderScreen({ navigation, route }: any) {
  const language = 'UA'
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  const [modal, setModal] = useState<any>(null)

  const [taskId, setTaskId] = useState<string>('')

  const [bottomSheetContent, setBottomSheetContent] =
    useState<string>('taskBlock')
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['100%'], []) // TODO

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

  function RenderTask({ item, index }: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          setTaskId(item.id)
          setBottomSheetContent('taskInfoBlock')
          bottomSheetModalRef.current?.present()
          // navigation.navigate('TaskInfoScreen', { taskId: item.id })
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
          leftThreshold={width * 0.2}
          rightThreshold={width * 0.2}
          friction={0.5}
          onSwipeableOpen={() => {
            onSwipeableOpen(index)
          }}
          onSwipeableWillOpen={(direction: any) => {
            if (direction === 'left') {
              ToggleTaskFunc(item)
            } else {
              setModal(item)
              // DeleteTaskFunc(item)
            }
          }}
        >
          <Animated.View style={styles.card}>
            <Text
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
        <Button
          title="Add"
          disable={false}
          action={() => {
            setTaskId('')
            setBottomSheetContent('taskBlock')
            bottomSheetModalRef.current?.present()
          }}
          // style={{ width: '49%' }}
        />
        {/* </View> */}

        {family.folder[route.params.folderId]?.task &&
        Object.values(family.folder[route.params.folderId]?.task).length ? (
          <FlatList
            style={{ width: '100%' }}
            data={GetSortedTasks(family.folder[route.params.folderId].task)}
            renderItem={RenderTask}
          />
        ) : (
          <></>
        )}
      </View>
      {/* MODAL */}
      <DeleteTaskModal
        modal={modal}
        onClose={() => {
          setModal(null)
          CloseSwipeables()
        }}
        onDelete={() => {
          DeleteTaskFunc(modal.id)
          setModal(null)
        }}
      />
      {/* BOTTOM */}
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={() => bottomSheetModalRef.current?.dismiss()}
        content={bottomSheetContent}
        familyId={family.id}
        taskId={taskId}
        folderId={route.params.folderId}
        onEdit={() => setBottomSheetContent('taskBlock')}
        onBack={() => setBottomSheetContent('taskInfoBlock')}
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
    height: width * 0.12,
  },
  taskTitle: {
    fontSize: width * 0.05,
    color: colors.text,
  },
})
