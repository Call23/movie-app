import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Tabs } from "expo-router";

import { Colors } from "../../constants/colors";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItems,
        tabBarLabelStyle: styles.barTitle,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={Colors.light[100]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={24}
              color={Colors.light[100]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={Colors.light[100]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={24}
              color={Colors.light[100]}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  barTitle: {
    tintColor: "#151312",
    fontSize: 12,
    fontWeight: "bold",
  },
  tabBar: {
    backgroundColor: "#0f0D23",
    borderRadius: 50,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 58,
    position: "absolute",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#0f0d23",
  },
  tabBarItems: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
