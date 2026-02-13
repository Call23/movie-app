import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import ThemedView from "../../components/ThemedView";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import { fetchmovieDetails } from "../../services/api";
import useFetch from "../../services/useFetch";

import { Colors } from "../../constants/colors";

import star from "../../assets/icons/star.png";
import arrow from "../../assets/icons/arrow.png";
import { goBack } from "expo-router/build/global-state/routing";
import { router } from "expo-router";

const MovieDetails = () => {
  const MovieInfo = ({ label, value }) => (
    <View style={styles.labelCont}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value || "N/A"}</Text>
    </View>
  );
  const { id } = useLocalSearchParams();

  const { data: movie, loading } = useFetch(() => fetchmovieDetails(id));

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            style={{
              width: "100%",
              height: 550,
            }}
            resizeMode="stretch"
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{movie?.title}</Text>
          <View style={styles.yearContainer}>
            <Text style={styles.year}>
              {" "}
              Realse year :{movie?.release_date?.split(" - ")[0]}
            </Text>
          </View>
          <View style={styles.yearContainer}>
            <Text style={styles.year}>Run time : {movie?.runtime} minutes</Text>
          </View>
          <View style={styles.img_container}>
            <Image
              source={star}
              style={{
                width: 16,
                height: 16,
              }}
            />
            <Text style={styles.rating}>
              {Math.round(movie?.vote_average) ?? 0}/10
            </Text>
            <Text
              style={{
                color: Colors.light[200],
                fontSize: 14,
              }}
            >
              ({movie?.vote_count} votes)
            </Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo
            label="Genres"
            value={
              movie?.genres
                ? movie.genres.map((gen) => gen.name).join(" - ")
                : "N/A"
            }
          />
          <View style={styles.budget}>
            <MovieInfo
              label="Budget"
              value={`$${movie?.budget / 1000000} million`}
            />
            <MovieInfo
              label="Revenue"
              value={`$${Math.round(movie?.revenue) / 1000000} `}
            />
          </View>
          <MovieInfo
            label="Production Companies"
            value={
              movie?.production_companies
                ? movie.production_companies.map((c) => c.name).join(", ")
                : "N/A"
            }
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.goBackCont} onPress={router.back}>
        <Image style={styles.arrow} source={arrow} tintColor="#fff" />
        <Text style={styles.goBack}>Go back</Text>
      </TouchableOpacity>
    </ThemedView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 20,
  },
  yearContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    columnGap: 4,
  },
  year: {
    color: Colors.light[200],
    fontSize: 14,
  },
  img_container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.dark[100],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    columnGap: 4,
    marginTop: 8,
  },
  rating: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  labelCont: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: 20,
  },
  label: {
    color: Colors.light[200],
    fontWeight: "400",
    fontSize: 14,
  },
  value: {
    color: Colors.light[100],
    fontWeight: "700",
    fontSize: 14,
    marginTop: 8,
  },
  budget: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
  },
  goBackCont: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 20,
    backgroundColor: Colors.accent,
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 50,
  },

  arrow: {
    width: 20,
    height: 20,
    marginRight: 4,
    marginTop: 2,
    transform: [{ rotate: "180deg" }],
  },
  goBack: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
});
