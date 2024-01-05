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
import { Family, Task, User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import ProfileHeader from '../../components/ProfileHeader'
import MainUserCircles from '../../components/MainUserCircles'
import BottomModalBlock from '../../components/BottomModalBlock'
import { Ionicons } from '@expo/vector-icons'
import { GetDateTime, GetLastUpdated } from '../../functions/function'
import text from '../../constants/text'

const width = Dimensions.get('screen').width

export default function MainScreen({ navigation }: any) {
  const language = 'UA'
  const user: User = useSelector((state: RootState) => state.user)
  const family: Family = useSelector((state: RootState) => state.family)

  function RenderFolderItem({ item, index }: any) {
    const lastAction = family.folder[item.id]?.task
      ? Object.values(family.folder[item.id].task).sort(
          (a: Task, b: Task) => +b.created - +a.created
        )[0].created
      : 0

    const lastUpdated: string = family.folder[item.id]?.task
      ? GetLastUpdated(lastAction, language)
      : '-'

    const urgent = family.folder[item.id]?.task
      ? Object.values(family.folder[item.id].task).find(
          (t: Task) => t.urgent && !t.doneBy
        )
      : false

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('FolderScreen', { folderId: item.id })
        }
        style={[styles.card, { marginRight: index % 2 === 0 ? '4%' : '0%' }]}
      >
        <View style={styles.cardRowBetween}>
          <View
            style={{
              width: width * 0.15,
              height: width * 0.15,
              borderRadius: width * 0.15,
              backgroundColor: item.color,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontSize: width * 0.07, color: colors.text }}>
              {item.task
                ? Object.values(item.task).filter((t: any) => !t.doneBy).length
                : 0}
            </Text>
            {urgent ? (
              <View
                style={{
                  width: width * 0.055,
                  height: width * 0.055,
                  borderRadius: width * 0.05,
                  backgroundColor: colors.errorText,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  borderWidth: width * 0.005,
                  borderColor: colors.card,
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
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'flex-start',
              height: '100%',
            }}
          >
            <Text
              style={{
                textAlign: 'right',
                color: colors.text,
                opacity: 0.7,
                fontWeight: '300',
                fontSize: width * 0.03,
              }}
            >
              {text[language].LastUpdate}
              {'\n'}
              {lastUpdated.toLocaleLowerCase()}
            </Text>
            <Ionicons name={item.icon} size={width * 0.1} color={colors.text} />
          </View>
        </View>
        <Text numberOfLines={1} style={styles.cardTitle}>
          {item.name}
        </Text>
      </TouchableOpacity>
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
      {family?.folder && Object.values(family?.folder)?.length ? (
        <FlatList
          style={{ width: '92%' }}
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
    fontSize: width * 0.04,
  },
  card: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    width: '48%',
    padding: '4%',
    borderRadius: width * 0.03,
    backgroundColor: colors.card,
    marginTop: width * 0.03,
    alignSelf: 'center',
  },
  cardRowBetween: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: width * 0.05,
    color: colors.text,
    // width: '100%',
    textAlign: 'right',
    flex: 1,
  },
})
