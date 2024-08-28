import React, { useEffect } from "react";
import { View, TouchableOpacity, Image, Alert, StatusBar } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; 
import notifee, { AuthorizationStatus } from "@notifee/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from "@react-native-firebase/messaging";
import DeviceInfo from "react-native-device-info";
import axios from "axios";
import Home from "../Src/Component/Home"; 
import StackNav from "./StackNav"; 

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: "#fff",
                height: 60,
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.25,
                shadowRadius: 3.5,
                elevation: 5,
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                // Custom middle button with logo
                if (route.name === "MiddleButton") {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{
                               
                                justifyContent: "center",
                                alignItems: "center",
                                top: -30,
                                width: 70,
                                height: 70,
                                borderRadius: 100,
                                backgroundColor: "#11025F",
                            }}
                        >
                            <Image
                                source={require("../assets/logo.png")} 
                                style={{ width: 50, height: 50 }}
                            />
                        </TouchableOpacity>
                    );
                }

              
                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                        key={index}
                    >
                        <Ionicons
                            name={options.tabBarIcon({ focused: isFocused })}
                            size={24}
                            color={isFocused ? "#11025F" : "gray"}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

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
            <StatusBar barStyle="light-content" backgroundColor="#11025F" />
            <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarIcon: ({ focused }) => (focused ? "home" : "home-outline"),
                        headerStyle: { backgroundColor: "#11025F" },
                        headerTintColor: "#fff",
                        headerTitle: null,
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="MiddleButton"
                    component={Home} 
                    options={{
                        tabBarButton: () => null, 
                        headerShown: false,
                    }}
                />
                <Tab.Screen
                    name="Notice"
                    component={StackNav}
                    options={{
                        tabBarIcon: ({ focused }) =>
                            focused ? "notifications" : "notifications-outline",
                        headerStyle: { backgroundColor: "#11025F" },
                        headerTintColor: "#fff",
                        headerTitle: null,
                        headerShown: false,
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default TabNav;

