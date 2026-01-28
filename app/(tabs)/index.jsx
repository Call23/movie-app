import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";
import { Colors } from "../../constants/colors";

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome!</Text>
      <Link href="/onboarding">Onboardimg</Link>
      <Link href="movies/id">Movie Details</Link>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 50,
    color: Colors.light[200],
    fontWeight: "bold",
  },
});
