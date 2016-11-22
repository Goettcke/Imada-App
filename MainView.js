import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableNativeFeedback,
    LayoutAnimation,
} from 'react-native';

import {
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
            LayoutAnimation.easeInEaseOut();
            this.setState({fbLoginStatus: true});
        } else {
            console.log('Logged out');
            this.setState({fbLoginStatus: false});
        }
    }

    async facebookLogin() {
        var res = await LoginManager.logInWithReadPermissions(['public_profile']);
        await this.updateLoginStatus();
    }

    async facebookLogout() {
        var res = await LoginManager.logOut();
        await this.updateLoginStatus();
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
            <Image source={require('./imada-logo.png')} style={styles.backgroundImageStyle}>
                <View style={{flex: 10, backgroundColor: 'transparent'}}>
                    {this.renderEventView()}
                </View>
                <View style={{flex: 5, opacity: 1}}>
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
            </Image>
        );
    }

}

const styles = StyleSheet.create({
    backgroundImageStyle: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'rgba(0,0,0,0)',
        resizeMode: 'contain',
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
        opacity: 1
    },
    buttonContainer: {
        elevation: 4,
        flex: 1,
        flexDirection: 'row',
    },
    loggedOutText: {
        color: mainTextColor,
        fontSize: 25,
        textShadowColor: 'black',
        /* borderColor: 'black',
         * borderWidth: 1,*/
        /* opacity: 0.5,*/
    },
    loggedOutContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
