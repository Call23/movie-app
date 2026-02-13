import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";

import rankingGradient from "../assets/images/rankingGradient.png";

import { Colors } from "../constants/colors";

const TrendingMoviesCard = ({ movie_id, title, poster_url, index }) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Image
          source={{
            uri: poster_url
              ? `https://image.tmdb.org/t/p/w500${poster_url}`
              : "https://placehold.co/600x400/1a1a1a/ffffff.png",
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.trendNo}>
          <MaskedView
            maskElement={
              <Text
                style={{
                  fontWeight: "700",
                  color: "#ffffff",
                  fontSize: 60,
                }}
              >
                {index + 1}
              </Text>
            }
          >
            <Image
              source={rankingGradient}
              resizeMode="cover"
              style={{
                width: 56,
                height: 56,
              }}
            />
          </MaskedView>
        </View>
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingMoviesCard;

const styles = StyleSheet.create({
  container: {
    width: 128,
    position: "relative",
    paddingLeft: 20,
  },
  image: {
    width: 128,
    height: 192,
    borderRadius: 8,
  },
  trendNo: {
    position: "absolute",
    bottom: 36,
    left: -14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  title: {
    fontSize: 15,
    color: Colors.light[200],
    fontWeight: "bold",
    marginTop: 10,
  },
});
