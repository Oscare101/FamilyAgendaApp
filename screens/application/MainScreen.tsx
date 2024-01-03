import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import { auth } from '../../firebase'
import BGCircles from '../../components/BGCircles'
import Button from '../../components/Button'
import { LogOut } from '../../functions/actions'
import { useEffect, useState } from 'react'
import { getDatabase, onValue, ref } from 'firebase/database'
import { User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import ProfileHeader from '../../components/ProfileHeader'

export default function MainScreen({ navigation }: any) {
  const user: User = useSelector((state: RootState) => state.user)
  function LogOutFunc() {
    LogOut()
    navigation.reset({
      index: 0,
      routes: [{ name: 'FirstScreen' }],
    })
  }

  return (
    <View style={styles.container}>
      <BGCircles />
      <ProfileHeader title={user?.name} action={() => {}} />
      <Text>
        {auth.currentUser?.email}.{user?.name}
      </Text>
      <Button title="LogOut" disable={false} action={LogOutFunc} />
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
