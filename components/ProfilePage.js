import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import ThemeLoggedIn from "./ThemeLoggedIn";
import { WP_GET } from "./WPAPI";
import { Base64 } from "js-base64";

export default function ProfilePage({ navigation, storedToken, setLoggedin}) {
    let userId;
    
    const tokenParse = function (token) {
        let base64Url = token.split('.')[1];
        let decoded = JSON.parse(Base64.decode(base64Url));    
        return decoded["data"].user.id;
    };
    userId = tokenParse(storedToken);

    const [buddypressData, setBuddypressData] = useState([]);
    useEffect(() => WP_GET("members", `/${userId}`)
                    .then(
                        (data) => {
                            setBuddypressData(data);
                        }
                    ), []);

    const [userData, setUserData] = useState([]);
    useEffect(() => WP_GET("users", `/${userId}`)
                    .then((data) => {
                        setUserData(data);
                    }), []);
    

    return (
        <ThemeLoggedIn navigation={navigation} setLoggedin={setLoggedin}>
            <View style={profileStyles.profileWrap}>
                <View style={profileStyles.profileLeft}>
                    <Image
                        style={profileStyles.profileImage}
                        source={{uri: buddypressData.avatar_urls?.full.startsWith('https:') ? buddypressData.avatar_urls?.full : 'https://www.gravatar.com/avatar/?d=identicon'}}
                    />
                </View>
                <View style={profileStyles.profileRight}>

                    <View style={profileStyles.nameWrap}>
                            <Text>{buddypressData.name}</Text>
                    </View>
                    <Text>About Me</Text>
                    <View style={profileStyles.descriptionWrap}>
                        <Text>{userData.description}</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={profileStyles.editBtn}
                    onPress={() =>navigation.navigate('EditProfile')}
                >
                    <Text style={profileStyles.editText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </ThemeLoggedIn>
    )
}

const profileStyles = StyleSheet.create({
    profileWrap: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        margin: 'auto',
    },
    nameWrap: {
        margin: 10,
    },
    profileLeft: {
        width: '100%',
        padding: 10,
        margin: 5,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 3,
        borderRadius: 10
    },
    profileRight: {
        // flex: 1,
        width: '100%',
        height: 400,
        padding: 10,
        margin: 5,
        backgroundColor: '#fff',
        borderWidth: 3,
        borderRadius: 10
    },
    profileImage: {
        width: 150,
        height: 150,
        margin: 5,
    },
    editBtn: {
        margin: 10,
        padding: 10,
        backgroundColor: "#16769E",
        borderWidth: 3,
        borderRadius: 10,
    },
    editText: {
        color: "#fff",
    }
});
