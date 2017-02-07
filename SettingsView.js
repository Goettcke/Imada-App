import React, { Component } from 'react';
import {
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
    LoginButton,
    AccessToken,
    LoginManager,
} from 'react-native-fbsdk';

import MyButton from './MyButton.js';
import MainView from './MainView.js';
import ImadaEventView from './ImadaEventView.js';
import {mainTextColor, darkBlue} from './constants.js';



var Login = React.createClass({
    render: function() {
        return (
        <View>
            <LoginButton
                publishPermissions={["publish_actions"]}
                onLoginFinished={
                    (error, result) => {
                        if (error) {
                            alert("Login failed with error: " + result.error);
                        } else if (result.isCancelled) {
                            alert("Login was cancelled");

                        }else{
                            alert("Login was successful with permissions: " + result.grantedPermissions)
                        }
                        }
                    }
                    onLogoutFinished={ () => alert("User logged out")}/>
            </View>

);
}
});


export default class SettingsView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontSize: 30}}>
                        Facebook:
                    </Text>
                    <Login />
                </View>
            </View>
        );
    }
}
