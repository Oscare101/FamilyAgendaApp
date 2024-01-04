import { Dimensions, TextInput, TouchableOpacity, View } from 'react-native'
import colors from '../constants/colors'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'

const width = Dimensions.get('screen').width

interface InputTextBlockProps {
  value: string
  setValue: any
  icon: keyof typeof Ionicons.glyphMap | ''
  type: string
  style?: any
}

export default function InputTextBlock(props: InputTextBlockProps) {
  const [open, setOpen] = useState<boolean>(props.type !== 'password')

  return (
    <View
      style={[
        {
          width: '92%',
          height: width * 0.15,
          backgroundColor: colors.card,
          borderRadius: width * 0.05,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: '4%',
          marginTop: width * 0.05,
        },
        props.style,
      ]}
    >
      {props.icon ? (
        <Ionicons name={props.icon} size={width * 0.06} color={colors.text} />
      ) : (
        <></>
      )}
      <TextInput
        placeholder={props.type}
        value={props.value}
        placeholderTextColor={colors.comment}
        secureTextEntry={!open}
        autoCapitalize="none"
        autoComplete="off"
        style={{
          fontSize: width * 0.06,
          flex: 1,
          textAlign: 'left',
          marginLeft: props.icon ? '4%' : '0%',
          color: colors.text,
        }}
        onChangeText={(value: string) => props.setValue(value)}
      />
      {props.type === 'password' ? (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOpen(!open)}
          style={{ marginLeft: '4%' }}
        >
          <Ionicons
            name={open ? 'eye-outline' : 'eye-off-outline'}
            size={width * 0.06}
            color={colors.text}
          />
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  )
}
