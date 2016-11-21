import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    /* Image,*/
    View,
    ScrollView,
    /* Alert,*/
    /* Button,
     * Dimensions,*/
    TouchableHighlight,
    TouchableNativeFeedback,
} from 'react-native';

import {
    GraphRequest,
    GraphRequestManager,
    LoginButton,
    AccessToken,
    LoginManager,
} from 'react-native-fbsdk';

import MyButton from './MyButton.js';
import MainView from './MainView.js';
import ImadaEventView from './ImadaEventView.js';
import {mainTextColor, darkBlue} from './constants.js';


export default class SettingsView extends Component {

    constructor(props) {
        super(props);
        this.updateLoginStatus = this.updateLoginStatus.bind(this);
        this.facebookLogout = this.facebookLogout.bind(this);
        /* this.updateLoginStatus();*/
    }

    async facebookLogout() {
        var res = await LoginManager.logOut();
        await this.updateLoginStatus();
        console.log(res);
    }

    updateLoginStatus = async () => {
        var result = await AccessToken.getCurrentAccessToken();
        if (result) {
            console.log('Logged in');
            this.setState({fbLoginStatus: true});
        } else {
            console.log('Logged out');
            this.setState({fbLoginStatus: false});
        }
    }

    render() {
        return <Text style={{fontSize: 30}}>Settings</Text>;
    }
}
