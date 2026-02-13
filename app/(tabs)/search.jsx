import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";

import bg from "../../assets/images/bg.png";
import logo from "../../assets/icons/logo.png";

import useFetch from "../../services/useFetch";
import { fetchMovie } from "../../services/api";

import ThemedView from "../../components/ThemedView";
import MovieCard from "../../components/MovieCard";
import { Colors } from "../../constants/colors";
import SearchBar from "../../components/SearchBar";
import { useEffect, useState } from "react";
import { updateSearchCount } from "../../services/appwrite";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesErrors,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovie({ query: searchQuery }), true);
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadMovies();
      } else {
        reset();
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    if (movies?.length > 0 && movies?.[0])
      updateSearchCount(searchQuery, movies[0]);
  }, [movies]);

  return (
    <ThemedView>
      <Image style={styles.bg} source={bg} />
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 16,
          marginVertical: 15,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.list}
        ListEmptyComponent={
          !moviesLoading && !moviesErrors ? (
            <View
              style={{
                marginTop: 40,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "#6b7280",
                  fontSize: 40,
                }}
              >
                {searchQuery.trim() ? "No movies found" : "Search for a movie"}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.searchBar}>
              <SearchBar
                placeholder="Search for a movie..."
                value={searchQuery}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </View>
            {moviesLoading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                style={styles.loading}
              />
            )}
            {moviesErrors && (
              <Text style={styles.error}>Error : {moviesErrors?.message}</Text>
            )}
            {!moviesLoading &&
              !moviesErrors &&
              searchQuery.trim() &&
              movies?.length > 0 && (
                <Text style={styles.searchText}>
                  Search results for {""}
                  <Text style={{ color: Colors.accent }}> {searchQuery}</Text>
                </Text>
              )}
          </>
        }
      />
    </ThemedView>
  );
};

export default Search;

const styles = StyleSheet.create({
  logo: {
    width: 40,
    height: 40,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: "center",
  },
  bg: {
    zIndex: 0,
    position: "absolute",
    width: "100%",
    height: "100%",
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
  searchBar: {
    marginTop: 20,
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
  searchText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "700",
    paddingTop: 20,
  },
});
