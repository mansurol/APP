import React from "react";
import { StatusBar } from "react-native"; // Import StatusBar
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import StackNav from "./StackNav";
import Home from "../Src/Component/Home";

const Tab = createBottomTabNavigator();

const TabNav = () => (
  <>
    <StatusBar
      barStyle="light-content" // Set text color for the status bar
      backgroundColor="#11025F" // Set background color for the status bar
    />
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Notice") {
            iconName = focused ? "notifications" : "notifications-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#11025F",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { display: "flex" },
        tabBarShowLabel: false, // Hide the tab bar labels
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: { backgroundColor: "#11025F" }, // Change header background color
          headerTintColor: "#fff", // Change header text and icon color
          headerTitle: null, // Hide the header title
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notice"
        component={StackNav}
        options={{
          headerStyle: { backgroundColor: "#11025F" }, // Change header background color
          headerTintColor: "#fff", // Change header text and icon color
          headerTitle: null, // Hide the header title
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  </>
);

export default TabNav;
