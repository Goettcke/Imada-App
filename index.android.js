/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView
} from 'react-native';

export default class testproject extends Component {
    render() {
        var url = { uri: "http://www.imada.sdu.dk/~jogoe12/images/IMADA_FAGRAAD_LOGO2.png" }
	      // <Image style={{width: 100, height:100}} source={url}/>
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={{fontSize: 50}}>Hello!</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('testproject', () => testproject);
