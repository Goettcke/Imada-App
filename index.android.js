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
    ListView
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


        this.state = {
            view: <MainView/>,
            switchView: this.switchToSettingsView,
            menuButtonText: "Settings",
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2})
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



        <Drawer
            ref={(ref) => this._drawer = ref}
            type="overlay"
            content={<Menu />}
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            closedDrawerOffset={-3}
            styles={{
                drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
                main: {paddingLeft: 3}
            }}
            tweenHandler={(ratio) => ({
                main: { opacity:(2-ratio)/2 }
            })}>
            {/* Navigator component will be here, in the meantime add a view:*/}
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
            </View>
        </Drawer>

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
