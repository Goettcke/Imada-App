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
    /* Alert,*/
    /* Button,
     * Dimensions,*/
    TouchableHighlight,
    LayoutAnimation,
} from 'react-native';

import MyButton from './MyButton.js';
import SettingsView from './SettingsView.js';
import MainView from './MainView.js';
import {darkBlue} from './constants.js';

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

export default class testproject extends Component {

    constructor(props) {
        super(props);

        this.state = {
            view: <MainView/>,
            switchView: this.switchToSettingsView,
            menuButtonText: "Settings"
        };
    }

    switchToMainView = () => {
        this.setState({
            switchView: this.switchToSettingsView,
            view: <MainView/>,
            menuButtonText: "Settings",
        });
    }

    switchToSettingsView = () => {
        this.setState({
            switchView: this.switchToMainView,
            view: <SettingsView/>,
            menuButtonText: "Main",
        });
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.topView}>
                    <MyButton onPress={this.state.switchView} style={styles.settingsButton} textStyle={styles.settingsButtonText} text="Settings"/>
                    <SaldoButton text="Saldo: -1261"/>
                </View>
                <View style={{flex: 10}}>
                    {this.state.view}
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
    topView: {
        /* borderBottomWidth: 2,
         * borderBottomColor: 'purple',*/
        flexDirection:'row',
        flex: 1,
        backgroundColor: darkBlue
    },
    settingsButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        backgroundColor: 'white',
        justifyContent: 'space-between',
    },
    settingsButtonText: {
        fontSize: 20
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
});

AppRegistry.registerComponent('testproject', () => testproject);
