import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";

import { useRouter } from "expo-router";

import { Colors } from "../../constants/colors";
import bg from "../../assets/images/bg.png";
import logo from "../../assets/icons/logo.png";

import ThemedView from "../../components/ThemedView";
import SearchBar from "../../components/SearchBar";
import useFetch from "../../services/useFetch";
import { fetchMovie } from "../../services/api";

const Home = () => {
  const router = useRouter();
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesErrors,
  } = useFetch(() => fetchMovie((querry = "")));

  return (
    <ThemedView>
      <Image source={bg} style={styles.img} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={logo} style={styles.logo} />

        {moviesLoading ? (
          <ActivityIndicator
            size={large}
            color="#0000ff"
            style={styles.loading}
          />
        ) : moviesErrors ? (
          <Text>Error : {moviesErrors?.message}</Text>
        ) : (
          <View>
            <View style={styles.searchBar}>
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie..."
              />
              <>
                <Text style={styles.text}>Latest Movies</Text>
              </>
            </View>
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  img: {
    zIndex: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  scroll: {
    flex: 1,
    paddingVertical: 5,
  },
  logo: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: "center",
  },
  searchBar: {
    marginTop: 20,
  },
  text: {
    fontSize: 50,
    color: Colors.light[200],
    fontWeight: "bold",
    alignSelf: "center",
  },
  loading: {
    marginTop: 30,
    alignSelf: "center",
  },
});
