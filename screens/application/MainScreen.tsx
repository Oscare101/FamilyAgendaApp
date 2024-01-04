import {
  Dimensions,
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

  return (
    <View style={styles.container}>
      <BGCircles />
      <ProfileHeader navigation={navigation} />
      {/* <Text>
        {auth.currentUser?.email}.{user?.name}
      </Text> */}
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
      {/* <Button title="LogOut" disable={false} action={LogOutFunc} /> */}
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
})
