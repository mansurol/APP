import React from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons"; 
import { useRoute } from "@react-navigation/native";

const Details = () => {
  const route = useRoute();
  const { filename } = route.params;
  const pdfUrl = `https://bpatcsc.org/uploads/${filename}`;

  const handleDownload = () => {
    Linking.openURL(pdfUrl).catch((err) =>
      console.error("Failed to open URL", err)
    );
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
            pdfUrl
          )}`,
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        startInLoadingState={true}
      />
      <TouchableOpacity style={styles.downloadButton} onPress={handleDownload}>
        <Ionicons name="download-outline" size={30} color="#ffffff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  downloadButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007BFF",
    borderRadius: 50,
    padding: 10,
    elevation: 3, // for Android
    shadowColor: "#000000", // for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default Details;