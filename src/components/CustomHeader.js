import React from 'react';
import {View, Text, Button, TouchableWithoutFeedback, StyleSheet, Image} from 'react-native';
import MenuIcon from '../assets/icons/menu.svg';
import DentBudLogo from '../assets/images/dentbud-logo-sm.png';

const CustomHeader = () => {
  return (<View style={styles.wrapper}>
        <View style={{flexDirection: "row"}}><Image source={DentBudLogo} style={{width: 30, height: 30, borderRadius: 100, marginRight: 6}}  /><Text style={styles.welcomeText}>DentBud</Text></View>
        <View><TouchableWithoutFeedback title="Love" onPress={() => console.log("menu pressed")}><MenuIcon width={30} height={30} /></TouchableWithoutFeedback></View>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        // borderWidth: 1,
        backgroundColor: "white",
        borderColor: "red",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        height: 60,
        width: "100%",
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15
    },

    welcomeText: {
        color: "black",
        // fontWeight: "",
        fontFamily: "Euclid Circular A Medium",
        fontSize: 25
    }
});

export default CustomHeader;
