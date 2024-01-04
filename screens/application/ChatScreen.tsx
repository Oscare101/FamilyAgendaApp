import { StyleSheet, Text, View } from 'react-native'
import colors from '../../constants/colors'
import BGCircles from '../../components/BGCircles'
import { User } from '../../constants/interfaces'
import { RootState } from '../../redux'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'

export default function ChatScreen({ navigation }: any) {
  const user: User = useSelector((state: RootState) => state.user)

  return (
    <View style={styles.container}>
      <BGCircles />
      <Header
        title={'Chat'}
        action={() => {
          navigation.goBack()
        }}
      />
      <Text>chat</Text>
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
