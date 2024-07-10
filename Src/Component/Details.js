import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";

const Details = () => {
  const route = useRoute();
  const { filename } = route.params;
  const pdfUrl = `https://bpatcsc.org/uploads/${filename}`;
  const googleDocsUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl
  )}`;

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: googleDocsUrl }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={true}
        startInLoadingState={true}
      />
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
});

export default Details;
