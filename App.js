import messaging from "@react-native-firebase/messaging";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { enableScreens } from "react-native-screens";
import TabNav from "./Navigation/TabNav";
import onMessageReceived from "./Src/utils/notifeeHandler";

import AsyncStorage from "@react-native-async-storage/async-storage";
import notifee from "@notifee/react-native";

SplashScreen.preventAutoHideAsync();
enableScreens();

messaging().setBackgroundMessageHandler(async (msz) => {
    console.log("msz", msz);
    await AsyncStorage.setItem("notificationData", "notice");

    await onMessageReceived(msz);

    return Promise.resolve();
});

notifee.onBackgroundEvent(({ type, detail }) => {
    console.log("type", type);
});

const prefixes = [
    Linking.createURL("/"),
    Linking.createURL("easyresultbd://"),
    Linking.createURL("easyresultbd://notice"),
];

const config = {
    screens: {
        Notice: {
            path: "notice",
        },
    },
};

const linking = {
    prefixes,
    config,
};

export default function App() {
    const navigationRef = React.createRef();

    useEffect(() => {
        const unsubscribe = messaging().onMessage((msz) => {
            onMessageReceived(msz);
            return Promise.resolve();
        });

        return unsubscribe;
    }, []);

    useEffect(() => {
        const handleRedirect = async (event) => {
            const hasRedirect = await AsyncStorage.getItem("notificationData");

            console.log("hasRedirect", hasRedirect);

            if (hasRedirect == "notice") {
                await AsyncStorage.removeItem("notificationData");
                navigationRef.current?.navigate("Notice");
            }
        };

        const timeout = setTimeout(() => {
            handleRedirect();
        }, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <NavigationContainer
            linking={linking}
            ref={navigationRef}
            onReady={async () => {
                await SplashScreen.hideAsync();
            }}
        >
            <TabNav />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});


