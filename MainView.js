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
import ImadaEventView from './ImadaEventView.js';
import {mainTextColor, darkBlue} from './constants.js';


export default class MainView extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            fbLoginStatus: false
        };
        this.updateLoginStatus = this.updateLoginStatus.bind(this);
        this.facebookLogin = this.facebookLogin.bind(this);
        this.facebookLogout = this.facebookLogout.bind(this);
        this.updateLoginStatus();
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

    async facebookLogin() {
        var res = await LoginManager.logInWithReadPermissions(['public_profile']);
        await this.updateLoginStatus();
        console.log(res);
    }

    async facebookLogout() {
        var res = await LoginManager.logOut();
        await this.updateLoginStatus();
        console.log(res);
    }

    renderEventView() {
        if (this.state.fbLoginStatus) {
            return <ImadaEventView fbLoginStatus={this.state.fbLoginStatus}/>;
        } else {
            return (
                <TouchableNativeFeedback onPress={this.facebookLogin}>
                    <View style={styles.loggedOutContainer}>
                        <Text style={styles.loggedOutText}>
                            Log in with facebook
                        </Text>
                    </View>
                </TouchableNativeFeedback>
            );
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 10, backgroundColor: darkBlue}}>
                    {this.renderEventView()}
                </View>
                <View style={{flex: 5}}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.innerContainer}>
                            <MyButton text="Sodavand"/>
                        </View>
                        <View style={styles.innerContainer}>
                            <MyButton text="Øl"/>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.innerContainer}>
                            <MyButton text="Button 3"/>
                        </View>
                        <View style={styles.innerContainer}>
                            <MyButton text="Button 4"/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: darkBlue,
    },
    buttonStyle: {

        backgroundColor: 'purple',
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    topView: {
        /* borderBottomWidth: 2,
         * borderBottomColor: 'purple',*/
        flexDirection:'row',
        flex: 1,
        backgroundColor: darkBlue
    },
    settingsButton: {
        backgroundColor: 'purple',
        /* marginTop: 10,*/
        /* marginBottom: 10,*/
        /* paddingBottom: 10,
         * paddingTop: 10,*/
    },
    settingsButtonText: {
        fontSize: 20
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: 'white',
        padding: 8,
        fontWeight: '500',
    },
    innerContainer: {
        flex: 1,
        borderColor: 'purple',
        alignItems: 'stretch',
        padding: 8,
        backgroundColor: darkBlue,
    },
    buttonContainer: {
        elevation: 4,
        flex: 1,
        flexDirection: 'row',
    },
    saldoButtonStyle: {
        borderRadius: 4,
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    saldoButtonTextStyle: {
        textAlign: 'right',
        color: 'black',
        padding: 8,
        fontSize: 15,
        fontWeight: '500',
    },
    loggedOutText: {
        color: mainTextColor,
        fontSize: 25,
        textShadowColor: 'black',
        /* borderColor: 'black',
         * borderWidth: 1,*/
        opacity: 0.5,
    },
    loggedOutContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
