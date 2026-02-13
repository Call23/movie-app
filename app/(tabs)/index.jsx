import {
  StyleSheet,
  Text,
  Image,
  ScrollView,
  View,
  ActivityIndicator,
  FlatList,
  ViewComponent,
} from "react-native";
import { Link } from "expo-router";

import { useRouter } from "expo-router";

import { Colors } from "../../constants/colors";
import bg from "../../assets/images/bg.png";
import logo from "../../assets/icons/logo.png";

import ThemedView from "../../components/ThemedView";
import SearchBar from "../../components/SearchBar";
import MovieCard from "../../components/MovieCard";

import useFetch from "../../services/useFetch";
import { fetchMovie } from "../../services/api";
import { getTrendingMovies } from "../../services/appwrite";
import TrendingMoviesCard from "../../components/TrendingMoviesCard";

const Home = () => {
  const router = useRouter();
  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingErrors,
  } = useFetch(getTrendingMovies);
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesErrors,
  } = useFetch(() => fetchMovie({ query: "" }));

  return (
    <ThemedView>
      <Image source={bg} style={styles.img} />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={logo} style={styles.logo} />

        {moviesLoading || trendingLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loading}
          />
        ) : moviesErrors || trendingErrors ? (
          <Text style={styles.error}>
            Error : {moviesErrors?.message || trendingErrors?.message}
          </Text>
        ) : (
          <View>
            <View style={styles.searchBar}>
              <SearchBar
                onPress={() => router.push("/search")}
                placeholder="Search for a movie..."
              />
              {trendingMovies && (
                <View style={{ marginTop: 40 }}>
                  <Text style={styles.text}>Trending Movies</Text>
                  <FlatList
                    style={{
                      marginBottom: 16,
                      marginTop: 12,
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    ItemSeparatorComponent={<View style={{ width: 16 }} />}
                    data={trendingMovies}
                    renderItem={({ item, index }) => (
                      <TrendingMoviesCard {...item} index={index} />
                    )}
                    keyExtractor={(item) => item.movie_id.toString()}
                  />
                </View>
              )}
              <>
                <Text style={styles.text}>Latest Movies</Text>
                <FlatList
                  data={movies}
                  renderItem={({ item }) => <MovieCard {...item} />}
                  keyExtractor={(item) => item.id.toString()}
                  numColumns={3}
                  columnWrapperStyle={{
                    justifyContent: "flex-start",
                    gap: 20,
                    paddingRight: 5,
                    marginBottom: 10,
                  }}
                  style={styles.list}
                  scrollEnabled={false}
                />
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
    paddingHorizontal: 5,
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

  list: {
    marginTop: 20,
    paddingBottom: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  error: {
    color: "#ef4444",
    paddingHorizontal: 20,
    marginVertical: 12,
  },
});
