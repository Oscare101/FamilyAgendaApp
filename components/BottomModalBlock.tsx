import {
  Dimensions,
  StatusBar,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import colors from '../constants/colors'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import IconColorBlockModal from './IconColorBlockModal'
import TaskBlockModal from './TaskBlockModal'
import TaskInfoBlockModal from './TaskInfoBlockModal'
import FolderInfoBlockModal from './FolderInfoBlockModal'

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
        taskId={props.taskId}
        onBack={props.onBack}
      />
    ),
    taskInfoBlock: (
      <TaskInfoBlockModal
        familyId={props.familyId}
        folderId={props.folderId}
        taskId={props.taskId}
        dismiss={props.dismiss}
        onEdit={props.onEdit}
      />
    ),
    folderBlock: (
      <FolderInfoBlockModal
        familyId={props.familyId}
        folderId={props.folderId}
      />
    ),
  }

  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: '#00000000' }}
      handleIndicatorStyle={{
        backgroundColor: '#00000000',
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
          ></View>
        </TouchableWithoutFeedback>
      )}
    >
      <View
        style={{
          backgroundColor: colors.card,
          flex: 1,
          borderTopRightRadius: width * 0.05,
          borderTopLeftRadius: width * 0.05,
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
