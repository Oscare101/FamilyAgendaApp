import {
  Dimensions,
  FlatList,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native'
import colors from '../constants/colors'
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import InputTextBlock from './InputTextBlock'
import { useState } from 'react'

const width = Dimensions.get('screen').width

export default function TaskBlockModal(props: any) {
  const [title, setTitle] = useState<string>('')
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
        <Text style={{ fontSize: 20, color: colors.text }}>
          Створити задачу
        </Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
        style={{
          flex: 1,
          width: '100%',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        <InputTextBlock
          value={title}
          setValue={(value: string) => setTitle(value)}
          icon=""
          type="Назва"
          style={{ borderWidth: 1, borderColor: colors.comment }}
        />
        {/* <View style={{ flexDirection: 'row' }}>
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
        </ScrollView> */}
      </TouchableWithoutFeedback>
    </>
  )
}
