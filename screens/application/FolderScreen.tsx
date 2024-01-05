import {
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Switch,
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
import { CreateTask, UpdateTask } from '../../functions/actions'
import { auth } from '../../firebase'
import BottomModalBlock from '../../components/BottomModalBlock'
import {
  GetDateTime,
  GetLastUpdated,
  GetSortedTasks,
} from '../../functions/function'
import { Swipeable } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

const width = Dimensions.get('screen').width

export default function FolderScreen({ navigation, route }: any) {
  const language = 'UA'
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

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

  function ToggleTaskFunc(item: any) {
    if (auth.currentUser && auth.currentUser.email) {
      const togglesTask = {
        ...item,
        doneBy: item.doneBy ? '' : auth.currentUser.email,
        doneTime: item.doneBy ? '' : new Date().getTime(),
      }

      UpdateTask(family.id, route.params.folderId, togglesTask)
      row.forEach((swipeable) => {
        if (swipeable && swipeable.close) {
          swipeable.close()
        }
      })
    }
  }

  function DeleteTaskFunc(item: any) {
    if (auth.currentUser && auth.currentUser.email) {
      // DeleteTODO(auth.currentUser.email, item.id)
    }
  }

  const swipeRrenderRightActions = (item: any) => {
    return (
      <View
        style={{
          backgroundColor: colors.errorBG,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '92%',
          height: '100%',
          borderRadius: 8,
          marginRight: '4%',
          paddingHorizontal: '4%',
        }}
      >
        <Ionicons
          name="chevron-back"
          size={width * 0.05}
          color={colors.errorText}
        />
        <Ionicons
          name="chevron-back"
          size={width * 0.05}
          color={colors.errorText}
        />
        <Ionicons
          name="chevron-back"
          size={width * 0.05}
          color={colors.errorText}
        />
        <Ionicons
          name="trash-bin-outline"
          size={width * 0.07}
          color={colors.errorText}
        />
      </View>
    )
  }

  const swipeRenderLeftActions = (item: any) => {
    return (
      <View
        style={{
          backgroundColor: colors.successBG,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          width: '92%',
          height: '100%',
          borderRadius: 8,
          marginLeft: '4%',
          paddingHorizontal: '4%',
        }}
      >
        <Ionicons
          name={item.doneBy ? 'square-outline' : 'ios-checkbox-outline'}
          size={width * 0.07}
          color={colors.successText}
        />
        <Ionicons
          name="chevron-forward"
          size={width * 0.05}
          color={colors.successText}
        />
        <Ionicons
          name="chevron-forward"
          size={width * 0.05}
          color={colors.successText}
        />
        <Ionicons
          name="chevron-forward"
          size={width * 0.05}
          color={colors.successText}
        />
      </View>
    )
  }

  function RenderTask({ item, index }: any) {
    return (
      <View
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
          renderRightActions={() => swipeRrenderRightActions(item)}
          renderLeftActions={() => swipeRenderLeftActions(item)}
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
              DeleteTaskFunc(item)
            }
          }}
          // onSwipeableWillOpen={(event:any, gestureState:any, swipeable:any) => {
          //   if (gestureState.dx > 0) {
          //     ToggleTODOFunc(item)
          //   } else {
          //     DeleteTODOFunc(item)
          //   }
          // }}
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
      </View>
    )
  }

  // function RenderTask({ item }: any) {
  //   return (
  //     <View style={styles.card}>
  //       <Text style={styles.taskTitle}>{item.title}</Text>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           alignItems: 'center',
  //           justifyContent: 'flex-end',
  //         }}
  //       >
  //         <Text style={{ fontWeight: '300', fontSize: width * 0.03 }}>
  //           {GetLastUpdated(item.created, language)}
  //         </Text>
  //       </View>
  //       {item.urgent ? (
  //         <View
  //           style={{
  //             width: width * 0.05,
  //             height: width * 0.05,
  //             borderRadius: width * 0.05,
  //             backgroundColor: colors.errorText,
  //             alignItems: 'center',
  //             justifyContent: 'center',
  //             position: 'absolute',
  //             top: width * 0.01,
  //             right: width * 0.01,
  //           }}
  //         >
  //           <Ionicons name="alert" size={width * 0.03} color={colors.card} />
  //         </View>
  //       ) : (
  //         <></>
  //       )}
  //     </View>
  //   )
  // }

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
        {/* <View style={styles.rowBetween}> */}
        {/* <Button
            title="Add"
            disable={false}
            action={() => {
              // bottomSheetModalRef.current?.present()
            }}
            style={{ width: '49%' }}
          /> */}
        <Button
          title="Add"
          disable={false}
          action={() => {
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
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={() => bottomSheetModalRef.current?.dismiss()}
        content={'taskBlock'}
        setTitle={(value: string) => setTitle(value)}
        title={setTitle}
        familyId={family.id}
        folderId={route.params.folderId}
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
