import { StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/colors";

const ThemedView = ({ ...props }) => {
  return <View style={styles.container} {...props} />;
};

export default ThemedView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "stretch",
  },
});
