import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable } from 'react-native';
import { theme } from './colors';

export default function App() {
  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.header}>
      <TouchableOpacity activeOpacity={0.5}>
        <Text style={styles.btnText}>Work</Text>
      </TouchableOpacity>

      <TouchableHighlight onPress={() => console.log('afaf')} underlayColor={'coral'} activeOpacity={0.5}>
        <Text style={styles.btnText}>Travel</Text>
      </TouchableHighlight>
    </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    marginTop: 100
  },
  btnText: {
    color: 'white',
    fontSize: 44,
    fontWeight: '600'
  }
});
