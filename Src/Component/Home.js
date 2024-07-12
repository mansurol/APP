import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const Home = () => {
  const [webViewUrl, setWebViewUrl] = useState(null);

  const handlePress = (url) => {
    setWebViewUrl(url);
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
          {/* Card 3: Online Payment */}
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

          {/* Card 5: Online Result */}
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              handlePress("https://easyresult.easytechsolution.org/")
            }
          >
            <Text style={styles.cardText}>Online{"\n"}Result</Text>
          </TouchableOpacity>

          {/* Card 4: Online Admission */}
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
          {/* Card 1: Student Login */}

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

          {/* Card 2: Teacher Login */}
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
            onPress={() => handlePress("https://bpatcsc.org/pages/notice")}
          >
            <Text style={styles.noticeBoardText}>Notice{"\n"}Board</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress("https://www.bpatcsc.org/")}
          >
            <Text style={styles.noticeBoardText}>Details{"\n"}More</Text>
          </TouchableOpacity>
          {/* New Card: Notice Board */}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => setWebViewUrl(null)}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
              <Text style={styles.headerText}>back</Text>
            </TouchableOpacity>
          </View>
          {renderWebView()}
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange children horizontally
    flexWrap: "wrap", // Wrap cards to the next line if they exceed the width
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20, // Add some top padding for better spacing
    paddingBottom: 20, // Adjust bottom padding if necessary
  },
  card: {
    width: "45%",
    aspectRatio: 1.3,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5, // Reduced margin vertical to minimize bottom padding
    elevation: 3, // for Android
    shadowColor: "#000000", // for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  noticeBoardCard: {
    width: "100%",
    aspectRatio: 4,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    height: 8,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    elevation: 3, // for Android
    shadowColor: "#000000", // for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 25,
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
    alignItems: "left",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "left",
    paddingHorizontal: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 5, // Adjust spacing between icon and text
  },
});

export default Home;
