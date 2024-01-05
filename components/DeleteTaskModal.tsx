import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import colors from '../constants/colors'
import text from '../constants/text'

const width = Dimensions.get('screen').width

export default function DeleteTaskModal(props: any) {
  const language = 'UA'
  return (
    <Modal transparent style={{ flex: 1 }} visible={!!props.modal}>
      <TouchableWithoutFeedback
        onPress={() => {
          props.onClose()
        }}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#00000060',
          }}
        >
          <View
            style={{
              width: width * 0.7,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.card,
              borderRadius: width * 0.05,
              paddingVertical: width * 0.06,
              paddingHorizontal: width * 0.03,
            }}
          >
            <Text
              style={{
                fontSize: width * 0.07,
                color: colors.text,
                marginBottom: width * 0.06,
              }}
            >
              {text[language].DeleteTask}
            </Text>
            <Text
              style={{
                fontSize: width * 0.05,
                color: colors.text,
                marginBottom: width * 0.06,
                fontWeight: '300',
              }}
            >
              {text[language].DoYouWantToDelete}{' '}
              <Text style={{ fontWeight: '500' }}>{props.modal?.title}</Text>
            </Text>
            <View style={styles.rowBetween}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  props.onClose()
                }}
                style={{ paddingVertical: width * 0.03 }}
              >
                <Text style={{ fontSize: width * 0.05, color: colors.text }}>
                  {text[language].Cancel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  props.onDelete()
                }}
                style={{ paddingVertical: width * 0.03 }}
              >
                <Text
                  style={{ fontSize: width * 0.05, color: colors.errorText }}
                >
                  {text[language].Delete}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  rowBetween: {
    width: '92%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})
