import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TouchableWithoutFeedback, Pressable , TextInput, ScrollView, Alert } from 'react-native';
import { theme } from './colors';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const TODO_KEY = '@todo'
  const CATEGORY_KEY = 'category'

  const [working, setWorking] = useState(AsyncStorage.getItem(CATEGORY_KEY))
  const [text, setText] = useState('')
  const [todo, setTodo] = useState({})

  const travel = async () => {
    
    try{
      setWorking( await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify({'category': 'travel'})))
    }catch(err){
      console.log(err)
    }
  };

  const work = async () => {
    // setWorking(true)
    try{
      setWorking( await AsyncStorage.setItem(CATEGORY_KEY, JSON.stringify({'category': 'work'})))
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    
    console.log(working)

  },[work, travel, working])

  const onTextChange = (e) => setText(e)

  const saveTodo = async (toSave) => {
    try{
      await AsyncStorage.setItem(TODO_KEY, JSON.stringify(toSave))
    }catch(err){
      console.log(err)
    }
  }

  const loadTodo = async () => {
    const str = await AsyncStorage.getItem(TODO_KEY) 
    const obj = JSON.parse(str)
    setTodo(obj)
  }

  const deleteTodo =  (key) => {
    Alert.alert('진짜 삭제 할겨?', '진짜??', [{
      text: '아니'
    }, 
    {
      text:'좋아', onPress: () => {
        const newTodo = {...todo}
        delete newTodo[key]
        setTodo(newTodo);
        saveTodo(newTodo)
      }
    }
  ])
    return
  }
  
  useEffect(() => {
    loadTodo()
  },[])

  const addTodo = async () => {
    if(text === ''){
      return
    }
    // const newTodo = Object.assign({}, todo, {[Date.now()]: {text, work: working}})
    const newTodo = {...todo, [Date.now()]:{text,working}}
    setTodo(newTodo)
    await saveTodo(newTodo)
    setText('')
  }

  return (
    <View style={styles.container}>
    <StatusBar style="auto" />
    <View style={styles.header}>

      <TouchableOpacity activeOpacity={0.5} onPress={work}>
        <Text style={{...styles.btnText, color: working === 'work' ? "white" : theme.grey}}>Work</Text>
      </TouchableOpacity>

      <TouchableHighlight onPress={travel} 
      // underlayColor={'coral'}
       activeOpacity={0.5}>
        <Text style={{...styles.btnText, color: working === 'travel' ?  theme.grey : "white"}}>Travel</Text>
      </TouchableHighlight>

  
    </View>
    <View>
        <TextInput placeholder={working ? 'Add a To Do' : "Where Do you want go?"} style={styles.input} 
        // onChange 인자 안주어도 됨
        onChangeText={onTextChange}
        // submit 이벤트
        onSubmitEditing={addTodo}
        // onChange 아님
        // onChange={onChangeText}
        value={text}
        // autoCapitalize='' 처음 패드가 대문자일것이냐 등 대문자에 관련된거 가능
        // autoCorrect 자동 추천 맞춤
        // keyboardType='email-address'  패드 스타일
        // 완료,보내기 타입 설정
        returnKeyType='done' 
        // secureTextEntry 비밀번호
        // multiline 자동 줄바꿈
        // placeholderTextColor="red" 플레이스홀더 텍스트 컬러 변경
        />
    </View>

    <ScrollView>
      {Object.keys(todo).map(keys => 
        todo[keys].working === working ? (
          <View style={styles.todos} key={keys}>
            <Text style={styles.todoText}>{todo[keys].text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(keys)}>
              <Ionicons name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ): null
        )
      }
    </ScrollView>
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
    
    fontSize: 44,
    fontWeight: '600'
  },
  input:{
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    marginVertical: 20,
    fontSize: 14
  },
  todos:{
    backgroundColor: theme.todoBg,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  todoText:{
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
  }
});
