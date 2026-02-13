import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";

import star from "../assets/icons/star.png";

const MovieCard = ({ id, title, poster_path, vote_average, release_date }) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          resizeMode="cover"
        />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.rating}>
          <Image style={styles.star} source={star} />
          <Text style={styles.rate}>{Math.round(vote_average / 2)}</Text>
        </View>
        <View style={styles.releaseDate}>
          <Text style={styles.date}>{release_date?.split("-")[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;

const styles = StyleSheet.create({
  card: {
    width: "30%",
  },
  image: {
    width: "100%",
    height: 208,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    color: Colors.light[200],
    fontWeight: "bold",
    marginTop: 10,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    columnGap: 4,
  },
  star: {
    width: 16,
    height: 16,
  },
  rate: {
    fontSize: 12,
    color: "#ffffff",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  releaseDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  date: {
    fontSize: 12,
    color: Colors.light[300],
    fontWeight: "500",
    marginTop: 4,
  },
});
