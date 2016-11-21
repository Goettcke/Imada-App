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
    /* Image,*/
    View,
    ScrollView,
    /* Alert,*/
    /* Button,
     * Dimensions,*/
    TouchableHighlight
} from 'react-native';

import {
    GraphRequest,
    GraphRequestManager,
    LoginButton,
    AccessToken,
} from 'react-native-fbsdk';

import ImadaEventView from './ImadaEventView.js';

class MyButton extends Component {
    static propTypes = {
        text: React.PropTypes.string.isRequired,
        onPress: React.PropTypes.func,
    }
    render() {
        const formattedText = this.props.text.toUpperCase();
        return (
            <TouchableHighlight onPress={this.props.onPress} style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>{formattedText}</Text>
            </TouchableHighlight>
        );
    }
}

class SaldoButton extends Component {
    static propTypes = {
        text: React.PropTypes.string.isRequired,
        onPress: React.PropTypes.func,
    }
    render() {
        const formattedText = this.props.text.toUpperCase();
        return (
            <TouchableHighlight onPress={this.props.onPress} style={styles.saldoButtonStyle}>
                <Text style={styles.saldoButtonTextStyle}>{formattedText}</Text>
            </TouchableHighlight>
        );
    }

}

const darkBlue = '#222230';


export default class testproject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            fbLoginStatus: false
        };
    }

    facebookLogin = (error, result) => {
        if (error) {
            console.log('login has error: ' + result.error);
        } else if (result.isCancelled) {
            console.log('login is cancelled.');
        } else {
            AccessToken.getCurrentAccessToken().then(
                (data) => {
                    console.log('Got access token:' + data.accessToken.toString());
                    this.setState({fbLoginStatus: true});
                }
            );
        }
    }

    facebookLogout = () => {
        this.setState({fbLoginStatus: true});
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={{borderBottomWidth: 2, borderBottomColor: 'purple', flexDirection:'row', flex: 1, backgroundColor: darkBlue}}>
                    <LoginButton onLoginFinished={this.loginToFacebook} onLogoutFinished={this.facebookLogout}/>
                    <SaldoButton text="Saldo: -1261"/>
                </View>

                <View style={{flex: 10, backgroundColor: darkBlue}}>
                    <ImadaEventView fbLoginStatus={this.state.fbLoginStatus}/>
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
        backgroundColor: '#F5FCFF',
    },
    buttonStyle: {
        elevation: 4,
        backgroundColor: 'purple',
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

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
        flex: 1,
        flexDirection: 'row',
    },
    saldoButtonStyle: {
        backgroundColor: '#222230',
        borderRadius: 4,
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    saldoButtonTextStyle: {
        textAlign: 'right',
        color: 'white',
        padding: 8,
        fontSize: 15,
        fontWeight: '500',
    }
});

AppRegistry.registerComponent('testproject', () => testproject);
