import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import colors from '../constants/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import text from '../constants/text'

const iconData = [
  { title: 'basket-outline' },
  { title: 'book-outline' },
  { title: 'bookmark-outline' },
  { title: 'car-outline' },
  { title: 'cash-outline' },
  { title: 'construct-outline' },
  { title: 'document-text-outline' },
  { title: 'gift-outline' },
  { title: 'home-outline' },
  { title: 'library-outline' },
]

const colorData = [
  { color: '#E8DB74' },
  { color: '#F7C1AF' },
  { color: '#A0C7EE' },
  { color: '#88C4A8' },
  { color: '#DDD2FD' },
]

const width = Dimensions.get('screen').width

export default function IconColorBlock(props: any) {
  const language = 'UA'
  function RenderColorItem({ item }: any) {
    return (
      <TouchableOpacity
        style={{
          width: width * 0.18 * 0.92,
          height: 40,
          margin: width * 0.01 * 0.92,
          borderWidth: 1,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: props.color === item.color ? colors.text : item.color,
          backgroundColor: item.color,
          elevation: props.color === item.color ? 5 : 0,
        }}
        activeOpacity={0.8}
        onPress={() => props.setColor(item.color)}
      ></TouchableOpacity>
    )
  }

  function RenderIconItem({ item }: any) {
    return (
      <TouchableOpacity
        style={{
          width: width * 0.18 * 0.92,
          height: width * 0.18 * 0.92,
          margin: width * 0.01 * 0.92,
          borderWidth: 1,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: colors.card,
          opacity: props.icon === item.title ? 1 : 0.5,
          elevation: props.icon === item.title ? 5 : 0,
        }}
        activeOpacity={0.8}
        onPress={() => props.setIcon(item.title)}
      >
        <Ionicons
          name={item.title}
          size={width * 0.12 * 0.92}
          color={colors.text}
        />
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
        }}
      >
        <Text style={styles.comment}>{text[language].ChooseColor}</Text>
        <View style={{ flexDirection: 'row', width: '92%' }}>
          <FlatList
            style={{ width: '100%' }}
            horizontal
            scrollEnabled={false}
            data={colorData}
            renderItem={RenderColorItem}
          />
        </View>
        <Text style={styles.comment}>{text[language].ChooseIcon}</Text>

        <FlatList
          style={{ width: '92%' }}
          scrollEnabled={false}
          numColumns={5}
          data={iconData}
          renderItem={RenderIconItem}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  comment: {
    width: '92%',
    textAlign: 'left',
    fontSize: width * 0.05,
    color: colors.comment,
  },
})
