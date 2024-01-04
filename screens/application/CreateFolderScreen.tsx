import {
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import {
  CreateFamily,
  CreateFolder,
  UpdateFamily,
  UpdateUser,
} from '../../functions/actions'
import { useMemo, useRef, useState } from 'react'
import { Family, Folder, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'
import InputTextBlock from '../../components/InputTextBlock'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { Ionicons } from '@expo/vector-icons'
import BottomModalBlock from '../../components/BottomModalBlock'

const width = Dimensions.get('screen').width

export default function CreateFolderScreen({ navigation }: any) {
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => [width * 0.6 + 100], [])

  const [name, setName] = useState<string>('')
  const [icon, setIcon] = useState<keyof typeof Ionicons.glyphMap | ''>('')
  const [color, setColor] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  async function CreateFolderFunc() {
    setLoading(true)
    const id: string = family.id + new Date().getTime()

    const newFolder: Folder = {
      name: name,
      id: id,
      icon: icon,
      color: color,
      task: [],
    }

    await CreateFolder(family.id, newFolder)

    navigation.goBack()
  }
  const input = (
    <View
      style={{
        width: '92%',
        height: width * 0.15,
        backgroundColor: colors.card,
        borderRadius: width * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: '4%',
        marginTop: width * 0.05,
        overflow: 'hidden',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: color,
          height: width * 0.15,
          width: width * 0.15,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          Keyboard.dismiss()
          bottomSheetModalRef.current?.present()
        }}
      >
        <Ionicons
          name={icon || 'help'}
          size={width * 0.07}
          color={colors.text}
        />
      </TouchableOpacity>

      <TextInput
        placeholder={'name'}
        value={name}
        placeholderTextColor={colors.comment}
        autoCapitalize="none"
        autoComplete="off"
        style={{
          fontSize: width * 0.06,
          flex: 1,
          textAlign: 'left',
          marginLeft: '4%',
          color: colors.text,
        }}
        onChangeText={(value: string) => setName(value)}
      />
    </View>
  )

  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <BGCircles />
        <Header title={'Create folder'} action={() => navigation.goBack()} />
        {input}
        <Button
          title="Create folder"
          disable={!(name && color && icon && !loading)}
          action={CreateFolderFunc}
        />
      </View>
      <BottomModalBlock
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        dismiss={() => bottomSheetModalRef.current?.dismiss()}
        content={'iconColorBlock'}
        setIcon={(value: keyof typeof Ionicons.glyphMap) => setIcon(value)}
        setColor={(value: string) => setColor(value)}
        icon={icon}
        color={color}
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
})
