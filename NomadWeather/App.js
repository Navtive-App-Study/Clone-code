import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	Dimensions,
	Text,
	View,
	ScrollView,
	ActivityIndicator,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "a0b281782852abce2e84f75cfe2be1eb";

export default function App() {
	const [city, setCity] = useState("Loading...");
	const [days, setDays] = useState([]);
	const [ok, setOk] = useState(true);

	const getWeather = async () => {
		const { grented } = await Location.requestForegroundPermissionsAsync();

		if (!grented) setOk(false);

		const {
			coords: { latitude, longitude },
		} = await Location.getCurrentPositionAsync({ accuracy: 5 });
		const location = await Location.reverseGeocodeAsync(
			{ latitude, longitude },
			{ useGoogleMaps: false }
		);

		setCity(location[0].city);

		const res = await fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
		);

		const data = await res.json();
		setDays(data.daily);
	};

	useEffect(() => {
		getWeather();
	}, []);
	return (
		<View style={styles.container}>
			<StatusBar style="light" />
			<View style={styles.city}>
				<Text style={styles.cityName}>{city}</Text>
			</View>
			<ScrollView
				pagingEnabled
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.weather}
			>
				{days.length === 0 ? (
					<View style={styles.day}>
						<ActivityIndicator
							color="white"
							size="large"
							style={{ marginTop: 10 }}
						/>
					</View>
				) : (
					days.map((day, idx) => {
						return (
							<View style={styles.day} key={idx}>
								<Text style={styles.temp}>
									{parseFloat(day.temp.day).toFixed(1)}
								</Text>
								<Text style={styles.description}>{day.weather}</Text>
							</View>
						);
					})
				)}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
	city: {
		flex: 1.2,
		justifyContent: "center",
		alignItems: "center",
	},
	cityName: {
		fontSize: 68,
		fontWeight: 500,
		color: "#fff",
	},
	weather: {},
	day: {
		width: SCREEN_WIDTH,
		alignItems: "center",
	},
	temp: {
		marginTop: 50,
		fontSize: 178,
		fontWeight: 600,
		color: "#fff",
	},
	description: {
		marginTop: -30,
		fontSize: 60,
		color: "#fff",
	},
});
