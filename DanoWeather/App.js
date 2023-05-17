import { useEffect, useState } from 'react';
import * as Location from 'expo-location'
import {  View ,StyleSheet, Text , ScrollView, Dimensions} from 'react-native';
const { height, width: SCREEN_WIDTH } = Dimensions.get('window')
const API_KEY = "c06c9380e301b89b4ded2081a7af6cd1"


export default function App() {
  const [city, setCity] = useState("Loading...")
  const [contract, setContract] = useState(true)
  const [days, setDays] = useState([])
  const getLocation = async() => {
    const {granted} =  await Location.requestForegroundPermissionsAsync()
    if(!granted) setContract(false)
    

    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy: 5})
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false})
    setCity(location[0].district)
    const res =  (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`))
    console.log(res, ' 리스폰 리스폰')
  }


  useEffect(() => {
    getLocation()
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false}  contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral',
    
  },
  city: {
    flex:1.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cityName: {
    fontSize: 68,
    fontWeight:'500'
  },
  weather: {
  },
  day:{
    width: SCREEN_WIDTH,
    alignItems: 'center'
  },
  temp: {
    fontSize: 128,
    marginTop: 40,
  },
  description:{
    fontSize: 40,
    marginTop: -40,
  }
});
