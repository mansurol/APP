import { Ionicons } from "@expo/vector-icons"; // Import icons
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { PermissionsAndroid, StatusBar } from "react-native"; // Import StatusBar
import Home from "../Src/Component/Home";
import StackNav from "./StackNav";
import messaging from "@react-native-firebase/messaging";
import firestore from "@react-native-firebase/firestore";

const Tab = createBottomTabNavigator();

const TabNav = () => {
  useEffect(() => {
    const checkNotificationPermission = async () => {
      try {
        const authState = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
        );

        console.log("authState", authState);

        const enabled = authState === "granted" || authState === "limited";

        if (enabled) {
          const localToken = await AsyncStorage.getItem("fcmToken");

          if (!localToken) {
            try {
              const fcmToken = await messaging().getToken();
              AsyncStorage.setItem("fcmToken", fcmToken);
              await firestore().collection("fcmTokens").add({
                token: fcmToken,
                createdAt: firestore.FieldValue.serverTimestamp(),
              });

              console.log("fcmToken", fcmToken);
            } catch (error) {
              console.log("error", error);
            }
          }
        }

        return true;
      } catch (error) {
        return false;
      }
    };
    checkNotificationPermission();
  }, []);

  return (
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
};

export default TabNav;
