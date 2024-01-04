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
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import { LogOut } from '../../functions/actions'
import { useEffect, useMemo, useRef, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { Family, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import ProfileHeader from '../../components/ProfileHeader'
import MainUserCircles from '../../components/MainUserCircles'
import BottomModalBlock from '../../components/BottomModalBlock'
import { Ionicons } from '@expo/vector-icons'

const width = Dimensions.get('screen').width

export default function MainScreen({ navigation }: any) {
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  function RenderFolderItem({ item }: any) {
    return (
      <View style={styles.card}>
        <Text>{item.name}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BGCircles />
      <ProfileHeader navigation={navigation} />

      {user.familiesId?.length ? (
        <>
          <MainUserCircles navigation={navigation} />
        </>
      ) : (
        <Button
          title="Create family"
          disable={false}
          action={() => navigation.navigate('CreateFamilyScreen')}
        />
      )}
      <View style={styles.rowBetween}>
        <Text style={styles.addFolderText}>Family folders:</Text>
        <TouchableOpacity
          style={styles.addFolderButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CreateFolderScreen')}
        >
          <Ionicons name="add" size={width * 0.06} color={colors.text} />
          <Text style={styles.addFolderText}>create folder</Text>
        </TouchableOpacity>
      </View>
      {Object.values(family?.folder)?.length ? (
        <FlatList
          style={{ width: '100%' }}
          numColumns={2}
          data={Object.values(family.folder)}
          renderItem={RenderFolderItem}
        />
      ) : (
        <></>
      )}
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
    marginTop: 20,
  },
  addFolderButton: {
    backgroundColor: colors.card,
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.02,
    padding: width * 0.01,
  },
  addFolderText: {
    fontSize: width * 0.05,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '48%',
    padding: '4%',
    borderRadius: width * 0.03,
    backgroundColor: colors.card,
    marginTop: width * 0.03,
    alignSelf: 'center',
  },
})
