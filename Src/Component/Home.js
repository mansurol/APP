import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  TouchableWithoutFeedback
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";
import notifee, { EventType } from "@notifee/react-native";
import * as Linking from "expo-linking";
import { useNavigation } from "@react-navigation/native";
const Home = () => {
  const navigation = useNavigation();
  const [webViewUrl, setWebViewUrl] = useState(null);
  const [isAdminVisible, setIsAdminVisible] = useState(false);
  useEffect(() => {
    return notifee.onForegroundEvent(({ type, detail }) => {
      console.log("type", type);
      if (EventType.PRESS === type) {
        Linking.openURL("easyresultbd://notice");
      }
    });
  }, []);

  useEffect(() => {
    Linking.addEventListener("url", ({ url }) => {
      console.log("url", url);
    });
  }, []);

  const handlePress = (url) => {
    setWebViewUrl(url);
  };
  const handleBackPress = () => {
    console.log("Back button pressed"); 
    setWebViewUrl(null);
  };
  const handleTouchTop = () => {
    setIsAdminVisible(true);
  };

  const renderWebView = () => {
    if (webViewUrl) {
      return <WebView source={{ uri: webViewUrl }} />;
    }
    return null;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#060D55" }}>
      <StatusBar barStyle="light-content" backgroundColor="#11025F" />
      {!webViewUrl ? (
        <View style={styles.container}>
          {/* Hidden admin button that appears when touched */}
          {isAdminVisible && (
            <TouchableOpacity
              style={styles.cards}
              onPress={() =>
                handlePress("https://easyresult.easytechsolution.org/")
              }
            >
              <Text style={styles.cardText}>Admin</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://easyresult.easytechsolution.org/online_payments.php"
              )
            }
          >
            <Text style={styles.cardText}>Online{"\n"}Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://easyresult.easytechsolution.org/admission/admission_school.php"
              )
            }
          >
            <Text style={styles.cardText}>Admission{"\n"}Form</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress("https://easyresult.easytechsolution.org/")
            }
          >
            <Text style={styles.cardText}>Online{"\n"}Result</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://easyresult.easytechsolution.org/admission/adm_school.php"
              )
            }
          >
            <Text style={styles.cardText}>School{"\n"}Admission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://easyresult.easytechsolution.org/student_login.php"
              )
            }
          >
            <Text style={styles.cardText}>Student{"\n"}Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://easyresult.easytechsolution.org/admission/admission.php"
              )
            }
          >
            <Text style={styles.cardText}>College{"\n"}Admission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://easyresult.easytechsolution.org/teacher_login.php"
              )
            }
          >
            <Text style={styles.cardText}>Teacher{"\n"}Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://easyresult.easytechsolution.org/teacher_staff.php"
              )
            }
          >
            <Text style={styles.cardText}>Teacher &{"\n"}Staff</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://docs.google.com/forms/d/e/1FAIpQLSce_EAzvss0SauFMuCxh34uchcvsU3nYhc_l-ccFqumddRE0A/viewform?c=0&w=1"
              )
            }
          >
            <Text style={styles.cardText}>Alumni</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress(
                "https://easyresult.easytechsolution.org/career/career_home.php"
              )
            }
          >
            <Text style={styles.cardText}>Career{"\n"}Opportunities</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Notice")}
          >
            <Text style={styles.noticeBoardText}>Notice{"\n"}Board</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress("https://www.bpatcsc.org/")}
          >
            <Text style={styles.noticeBoardText}>Details{"\n"}More</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBackPress}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
              <Text style={styles.headerText}>back</Text>
            </TouchableOpacity>
          </View>
          {renderWebView()}
        </View>
      )}
      {!webViewUrl && (
        <Text style={styles.footerText}>
          POWERED BY {"\n"} EASYTECHSOLUTION
        </Text>
      )}

      {/* Touchable area at the top to reveal the hidden button */}
      <TouchableWithoutFeedback onPress={handleTouchTop}>
        <View style={styles.touchableTop} />
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 60 : 20,
    paddingBottom: 20,
  },
  card: {
    width: "48%",
    aspectRatio: 1.5,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  cards: {
    width: "100%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 3,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  touchableTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    zIndex: 1,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  noticeBoardText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  header: {
    height: 50,
    backgroundColor: "#11025F",
    justifyContent: "center",
    alignItems: "flex-start",
    zIndex: 10,
    elevation: 3,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5,
  },
  footerText: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 10,
    paddingBottom: 10,
    textAlign: "right",
    color: "gray",
  },
});


export default Home;
