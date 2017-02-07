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
    View,
    Image,
    TouchableHighlight,
    TouchableNativeFeedback,
    LayoutAnimation,
} from 'react-native';

import Drawer from 'react-native-drawer';

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

        <Drawer
            ref={(ref) => this._drawer = ref}
            content={<SettingsView />}
        >
        <SettingsView />
        </Drawer>  

        this.state = {
            view: <MainView/>,
            switchView: this.switchToSettingsView,
            menuButtonText: "Settings"
        };
    }

    closeControlPanel = () => {
       this._drawer.close()
     };
     openControlPanel = () => {
       this._drawer.open()
     };

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
                    <TouchableNativeFeedback onPress={ () => {this._drawer.open()}}>
                        <View style={styles.settingsButton}>
                            <Image style={{width: 50, height: 50}} source={require('./logo.png')}/>
                            <Text style={styles.settingsButtonText}>
                                {this.state.menuButtonText}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
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
        backgroundColor: darkBlue,
        elevation: 5,
        /* borderWidth: 1,
         * borderColor: 'black',*/
    },
    settingsButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingsButtonText: {
        fontSize: 20,
        color: 'black'
    },
    saldoButtonStyle: {
        /* borderWidth: 1,
         * borderColor: 'black',*/
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
