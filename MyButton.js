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

import MainView from './MainView.js';
import ImadaEventView from './ImadaEventView.js';
import {mainTextColor, darkBlue} from './constants.js';

export default class MyButton extends Component {
    static propTypes = {
        text: React.PropTypes.string.isRequired,
        onPress: React.PropTypes.func,
    }
    render() {
        const formattedText = this.props.text.toUpperCase();
        return (
            <TouchableNativeFeedback onPress={this.props.onPress}>
                <View style={[styles.buttonStyle, this.props.style]}>
                    <Text style={[styles.buttonTextStyle, this.props.textStyle]}>{formattedText}</Text>
                </View>
            </TouchableNativeFeedback>
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
