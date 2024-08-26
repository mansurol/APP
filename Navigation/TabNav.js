import { Ionicons } from "@expo/vector-icons"; // Import icons
import notifee, { AuthorizationStatus } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
import React, { useEffect } from "react";
import { Alert, StatusBar } from "react-native"; // Import StatusBar
import DeviceInfo from "react-native-device-info";
import Home from "../Src/Component/Home";
import StackNav from "./StackNav";

const Tab = createBottomTabNavigator();

const TabNav = () => {
    useEffect(() => {
        const checkNotificationPermission = async () => {
            try {
                const deviceUniqueId = await DeviceInfo.getUniqueId();
                
                const localToken = await AsyncStorage.getItem("fcmToken");

                if (!localToken) {
                    try {
                        const hasPermission = await notifee.requestPermission();
                        console.log("hasPermission", hasPermission);
                        if (
                            hasPermission.authorizationStatus ===
                            AuthorizationStatus.AUTHORIZED
                        ) {
                            const fcmToken = await messaging().getToken();
                            AsyncStorage.setItem("fcmToken", fcmToken);
                            await axios.post(
                                "https://testpush-theta.vercel.app/register-token",
                                {
                                    token: fcmToken,
                                    deviceId: deviceUniqueId,
                                }
                            );
                        } else {
                            Alert.alert(
                                "Permission Denied",
                                "You need to enable notification permission to receive notifications.",
                                [
                                    {
                                        text: "OK",
                                        onPress: () => {
                                            checkNotificationPermission();
                                        },
                                    },
                                    {
                                        text: "Cancel",
                                        onPress: () => {
                                            console.log("Cancel Pressed");
                                        },
                                        style: "cancel",
                                    },
                                ]
                            );
                        }
                    } catch (error) {
                        console.log("error", error);
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
                            iconName = focused
                                ? "notifications"
                                : "notifications-outline";
                        }
                        return (
                            <Ionicons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
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
