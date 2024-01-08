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
  CreateFolder,
  DeleteFolder,
  UpdateFolder,
} from '../../functions/actions'
import { useMemo, useRef, useState } from 'react'
import { Family, Folder, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'

import { Ionicons } from '@expo/vector-icons'
import BottomModalBlock from '../../components/BottomModalBlock'
import IconColorBlockModal from '../../components/IconColorBlockModal'
import text from '../../constants/text'
import DeleteModal from '../../components/DeleteModal'

const width = Dimensions.get('screen').width

export default function CreateFolderScreen({ navigation, route }: any) {
  const language = 'UA'
  const family: Family = useSelector((state: RootState) => state.family)

  const [name, setName] = useState<string>(route.params?.folder?.name || '')
  const [icon, setIcon] = useState<keyof typeof Ionicons.glyphMap | ''>(
    route.params?.folder?.icon || ''
  )
  const [color, setColor] = useState<string>(route.params?.folder?.color || '')

  const [loading, setLoading] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)

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

  async function UpdateFolderFunc() {
    setLoading(true)

    const newFolder: any = {
      name: name,
      id: route.params?.folder?.id,
      icon: icon,
      color: color,
    }

    await UpdateFolder(family.id, newFolder)
    navigation.goBack()
  }

  async function DeleteFolderFunc() {
    setLoading(true)
    await DeleteFolder(family.id, route.params?.folder?.id)
    setModal(false)
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainScreen' }],
    })
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
          // bottomSheetModalRef.current?.present()
        }}
      >
        <Ionicons
          name={icon || 'help'}
          size={width * 0.07}
          color={colors.text}
        />
      </TouchableOpacity>

      <TextInput
        placeholder={text[language].Title}
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
    <View style={styles.container}>
      <BGCircles />
      <Header
        title={
          route.params?.folder?.id
            ? text[language].UpdateFolder
            : text[language].CreateFolder
        }
        action={() => navigation.goBack()}
      />
      {input}
      <IconColorBlockModal
        color={color}
        icon={icon}
        setIcon={(value: keyof typeof Ionicons.glyphMap) => setIcon(value)}
        setColor={(value: string) => setColor(value)}
      />
      {route.params?.folder?.id ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setModal(true)
          }}
        >
          <Text style={styles.deleteButton}>{text[language].DeleteFolder}</Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
      <Button
        title={
          route.params?.folder?.id ? text[language].Save : text[language].Create
        }
        disable={!(name && color && icon && !loading)}
        action={() => {
          if (route.params?.folder?.id) {
            UpdateFolderFunc()
          } else {
            CreateFolderFunc()
          }
        }}
      />
      {/* MODAL */}
      <DeleteModal
        modal={modal}
        title={text[language].DeleteFolder}
        description={`${text[language].DoYouWantToDeleteFolder} "${
          route.params?.folder?.name || ''
        }"`}
        onClose={() => {
          setModal(false)
        }}
        onDelete={() => {
          DeleteFolderFunc()
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
})
