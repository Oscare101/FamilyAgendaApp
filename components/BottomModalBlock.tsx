import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  useColorScheme,
} from 'react-native'
import colors from '../constants/colors'
import { RootState } from '../redux'
import { useSelector } from 'react-redux'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useMemo, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import IconColorBlockModal from './IconColorBlockModal'
import TaskBlockModal from './TaskBlockModal'

const width = Dimensions.get('screen').width

export default function BottomModalBlock(props: any) {
  const contentData: any = {
    iconColorBlock: (
      <IconColorBlockModal
        setIcon={(value: string) => props.setIcon(value)}
        setColor={(value: string) => props.setColor(value)}
        icon={props.icon}
        color={props.color}
      />
    ),
    taskBlock: (
      <TaskBlockModal
        familyId={props.familyId}
        folderId={props.folderId}
        dismiss={props.dismiss}
      />
    ),
  }

  function RenderFamilyItem({ item }: any) {
    return (
      <TouchableOpacity>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: '#00000000' }}
      handleIndicatorStyle={{
        backgroundColor: '#FFF',
      }}
      ref={props.bottomSheetModalRef}
      snapPoints={props.snapPoints}
      backdropComponent={({ style }) => (
        <TouchableWithoutFeedback onPress={props.dismiss}>
          <View
            style={[
              style,
              {
                backgroundColor: '#00000066',
              },
            ]}
          >
            <StatusBar backgroundColor={'#eee'} />
          </View>
        </TouchableWithoutFeedback>
      )}
    >
      <View
        style={{
          backgroundColor: colors.card,
          flex: 1,
          borderTopRightRadius: width * 0.05,
          borderTopLeftRadius: width * 0.05,

          // margin: width * 0.03,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
          overflow: 'hidden',
        }}
      >
        {contentData[props.content]}
      </View>
    </BottomSheetModal>
  )
}
