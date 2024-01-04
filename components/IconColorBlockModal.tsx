import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import colors from '../constants/colors'
import { ScrollView } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'

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

export default function IconColorBlockModal(props: any) {
  function RenderColorItem({ item }: any) {
    return (
      <TouchableOpacity
        style={{
          width: width * 0.94 * 0.18,
          height: 40,
          margin: width * 0.94 * 0.01,
          borderWidth: 1,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: item.color,
          backgroundColor: item.color,
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
          width: width * 0.94 * 0.18,
          height: width * 0.94 * 0.18,
          margin: width * 0.94 * 0.01,
          borderWidth: 1,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'center',
          // borderColor: props.color,
          backgroundColor: props.color,
          opacity: props.icon === item.title ? 1 : 0.5,
        }}
        activeOpacity={0.8}
        onPress={() => props.setIcon(item.title)}
      >
        <Ionicons name={item.title} size={width * 0.12} color={colors.text} />
      </TouchableOpacity>
    )
  }

  return (
    <>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          borderBottomWidth: 1,
          // borderBlockColor: colors[themeColor].comment,
          height: 60,
          backgroundColor: colors.card,
        }}
      >
        <Text style={{ fontSize: 20, color: colors.text }}>Icon</Text>
      </View>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <FlatList
            style={{ width: '100%' }}
            horizontal
            scrollEnabled={false}
            data={colorData}
            renderItem={RenderColorItem}
          />
        </View>
        <ScrollView style={{ flex: 1, width: '100%' }}>
          <FlatList
            style={{ width: '100%' }}
            scrollEnabled={false}
            numColumns={5}
            data={iconData}
            renderItem={RenderIconItem}
          />
        </ScrollView>
      </View>
    </>
  )
}
