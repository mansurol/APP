import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const navigation = useNavigation();

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axios.get(
        "https://liveclass.bpatcsc.org/api-bpatcsc-notice.php"
      );
      setNotices(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching notices:", error);
      setLoading(false); // Handle error by setting loading to false
    }
  };

  const navigateToDetails = (filename) => {
    navigation.navigate("Details", { filename });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#060D55" }}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.heading}>Notices</Text>
          {loading ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loaderText}>Loading Notices...</Text>
            </View>
          ) : (
            notices.map((notice, index) => (
              <Pressable
                key={index}
                style={styles.noticeCard}
                onPress={() => navigateToDetails(notice.filename)}
              >
                <Text style={styles.noticeTitle}>{notice.title}</Text>
                <Text style={styles.noticeContent}>
                  Published Date: {notice.publish_date}
                </Text>
                <Text style={styles.noticeContent}>{notice.description}</Text>
              </Pressable>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
    textAlign: "center",
  },
  noticeCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    elevation: 3, // for Android
    shadowColor: "#000000", // for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  noticeContent: {
    fontSize: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    fontSize: 16,
    color: "#11025F",
  },
});

export default Notices;
