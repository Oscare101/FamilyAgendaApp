import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { Family, User } from '../constants/interfaces'
import { RootState } from '../redux'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { auth } from '../firebase'
import { getDatabase, onValue, ref } from 'firebase/database'
import { UpdateUser } from '../functions/actions'

const width = Dimensions.get('screen').width

export default function ProfileHeader({ navigation }: any) {
  const family: Family = useSelector((state: RootState) => state.family)
  const user: User = useSelector((state: RootState) => state.user)

  const [modal, setModal] = useState<boolean>(false)
  const [families, setFamilies] = useState<any[]>([])

  async function GetUserFamilies() {
    if (auth.currentUser && auth.currentUser.email) {
      const data = ref(getDatabase(), `family/`)
      onValue(data, (snapshot) => {
        setFamilies(
          Object.values(snapshot.val()).filter((f: any) =>
            f.users.includes(auth.currentUser!.email?.replace('.', ','))
          )
        )
      })
    }
  }

  async function SetCurrentFamily(id: string) {
    const data = {
      currentFamilyId: id,
    }
    if (auth.currentUser && auth.currentUser.email) {
      await UpdateUser(auth.currentUser.email, data)
      setModal(false)
    }
  }

  function RenderFamilyItem({ item }: any) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => SetCurrentFamily(item.id)}
        style={[
          styles.familyItemButton,
          { borderBottomWidth: 1, borderBottomColor: colors.line },
        ]}
      >
        <Ionicons
          name="open-outline"
          size={width * 0.05}
          color={colors.comment}
        />
        <Text numberOfLines={1} style={styles.familyName}>
          {item.name}
        </Text>
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.familyButton}
          onPress={() => {
            GetUserFamilies()
            setModal(true)
          }}
        >
          <Text numberOfLines={1} style={styles.title}>
            {family.name}
          </Text>
          <Ionicons
            name="caret-down-outline"
            size={width * 0.07}
            color={colors.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            navigation.navigate('SettingsScreen')
          }}
          style={styles.button}
        >
          <Ionicons
            name="settings-outline"
            size={width * 0.09}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
      <Modal transparent visible={modal} style={styles.modal}>
        <TouchableWithoutFeedback
          onPress={() => setModal(false)}
          style={styles.modalBg}
        >
          <View style={styles.modalView}>
            <View style={styles.modalBlock}>
              <FlatList
                data={families}
                renderItem={RenderFamilyItem}
                ListFooterComponent={() => (
                  <TouchableOpacity
                    style={styles.familyItemButton}
                    activeOpacity={0.8}
                    onPress={() => {
                      setModal(false)
                      navigation.navigate('CreateFamilyScreen')
                    }}
                  >
                    <Ionicons
                      name="add"
                      size={width * 0.05}
                      color={colors.comment}
                    />
                    <Text
                      style={[styles.familyName, { color: colors.comment }]}
                    >
                      Create
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '4%',
    height: width * 0.1,
    marginBottom: width * 0.07,
  },
  familyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: width * 0.1,
    width: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: width * 0.07,
    color: colors.text,
    marginRight: width * 0.02,
    // flex: 1,
  },
  // MODAL
  modal: {
    flex: 1,
  },
  modalBg: {
    flex: 1,
  },
  modalView: {
    flex: 1,
    backgroundColor: '#00000060',
  },
  modalBlock: {
    width: width * 0.7,
    backgroundColor: colors.card,
    elevation: 5,
    borderRadius: width * 0.03,
    position: 'absolute',
    top: width * 0.1,
    left: '4%',
  },

  //
  familyItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: width * 0.03,

    width: '92%',
    alignSelf: 'center',
  },
  familyName: {
    fontSize: width * 0.06,
    color: colors.text,
    marginLeft: 10,
  },
})
