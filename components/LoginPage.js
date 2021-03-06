import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import ThemeLoggedOut from "./ThemeLoggedOut";

const LoginPage = ({ navigation, setStoredToken, loggedIn, setLoggedin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    if (loading) {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: `${username}`,
          password: `${password}`,
        }),
      };

      fetch(
        `https://jualuc1.dreamhosters.com/wp-json/jwt-auth/v1/token`,
        options
      )
        .then((response) => response.json())
        .then((data) => {
          data.token ? formSuccess(data) : formError(data);
        });
    }
  }, [loading]);

  const onFormSubmit = () => {
    if (checkUsername()) {
      setError("User name contains illegal characters");
      return;
    }

    setError("");
    setLoading(true);
  };

  const formSuccess = (data) => {
    setToken(data.token);
    setStoredToken(data.token);
    setLoggedin(true);
    setLoading(false);
    setUsername("");
    setPassword("");
    navigation.navigate("NewsFeed");
  };

  const formError = (data) => {
    const regex = /<[^>]*>/g;
    setLoading(false);
    setPassword("");
    data?.message ? setError(data.message.replaceAll(regex, "")) : "";
  };
  const checkUsername = () => {
    const userName = username.replace(/[^a-zA-Z0-9_.-]/g, "#");
    return userName.includes("#");
  };

  return (
    <ThemeLoggedOut navigation={navigation}>
      {loggedIn ? (
        <View>
          <Text>Logged In</Text>
        </View>
      ) : (
        <View style={styles.loginPage}>
          <Image
            style={{ width: "100%", height: 64 }}
            onPress={() => navigation.navigate("NewsFeed")}
            source={require("./img/marvelSpace.png")}
          ></Image>
          <View style={styles.login}>
            <Text style={styles.usernameTitle}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              onSubmitEditing={onFormSubmit}
            />
            <Text style={styles.passwordTitle}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={onFormSubmit}
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.signupButton}
              onPress={onFormSubmit}
            >
              <Text style={styles.white}>Login</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.signupKey}>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() =>
                Linking.openURL("https://jualuc1.dreamhosters.com/register/")
              }
            >
              <Text style={styles.white}>Sign Up</Text>
            </TouchableOpacity>
            <Text>{loading && "Loading"}</Text>
            <Text>{error}</Text>
          </View>
        </View>
      )}
    </ThemeLoggedOut>
  );
};
const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 3,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    fontWeight: "bold",
  },
  login: {
    marginTop: 15,
  },
  header: {
    // display: 'flex',
    // justifyContent: 'center',
  },
  usernameTitle: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  passwordTitle: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  resetText: {
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  loginPage: {
    maxHeight: "100%",
  },
  signupButton: {
    backgroundColor: "#16769E",
    padding: 10,
    alignItems: "center",
    margin: 12,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#000",
  },
  white: {
    color: "#fff",
  },
});

export default LoginPage;
