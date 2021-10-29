import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { posts, users} from './components/WPAPI';
import Footer from './components/Footer';
import Header from './components/Header';
import { ProfilePage } from './components/ProfilePage';
import { LoginPage } from './components/LoginPage';
import { ResetPassword } from './components/ResetPassword';
import { SignupPage } from './components/SignupPage';


export default function App() {
  posts();
  // console.log(posts)
  users();
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      {/* <LoginPage/> */}
      {/* <ResetPassword/>      */}
      {/* <ProfilePage /> */}
      <SignupPage/>

      <Footer/>
      <StatusBar style="auto" />
      
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginPage: {

  }
});
