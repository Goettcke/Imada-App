/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableNativeFeedback,
    LayoutAnimation,
    Navigator,
    Alert,
    DeviceEventEmitter,
    TouchableOpacity
} from 'react-native';

import Drawer from 'react-native-drawer';
import {EventEmitter} from 'fbemitter';
import Icon from 'react-native-vector-icons/FontAwesome';

import MyButton from './MyButton.js';
import Settings from './views/Settings.js';
import Home from './views/Home.js';
import navigationHelper from './helpers/Navigation';
import styles from './styles/Main';
import Menu from './Menu';

let _emitter = new EventEmitter();

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
            view: <Home/>,
            switchView: this.switchToSettingsView,
            menuButtonText: 'Settings'
        };
    }

    switchToMainView = () => {
        this.setState({
            switchView: this.switchToSettingsView,
            view: <Home/>,
            menuButtonText: 'Settings',
        });
    }

    switchToSettingsView = () => {
        this.setState({
            switchView: this.switchToMainView,
            view: <Settings/>,
            menuButtonText: 'Home',
        });
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu navigate={(route) => {
                    this._navigator.push(navigationHelper(route));
                    this._drawer.close();
                }}/>}
                tapToClose={true}
                openDrawerOffset={0.6}
                panOpenMask={0.2}
                panCloseMask={0.6}
                closedDrawerOffset={-3}
                styles={{
                    drawer: {shadowColor: '#000000', shadowOpacity: 1, shadowRadius: 10, backgroundColor: '#FFFFFF'},
                    main: {paddingLeft: 3}
                }}
                tweenHandler={(ratio) => ({
                    main: {opacity: (2 - ratio) / 2}
                })}>
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
                    initialRoute={{
                        id: 'Home',
                        title: 'Home',
                        index: 0
                    }}
                    renderScene={(route, navigator) => this._renderScene(route, navigator)}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.navBar}
                            routeMapper={NavigationBarRouteMapper}/>
                    }
                />
            </Drawer>
            /*<View style={styles.mainContainer}>
             <View style={styles.topView}>
             <TouchableNativeFeedback onPress={this.state.switchView}>
             <View style={styles.settingsButton}>
             <Image style={{width: 50, height: 50}} source={require('./imada-logo.png')}/>
             <Text style={styles.settingsButtonText}>
             {this.state.menuButtonText}
             </Text>
             </View>
             </TouchableNativeFeedback>
             {/* <MyButton onPress={this.state.switchView} style={styles.settingsButton} textStyle={styles.settingsButtonText} text="Settings"/> *//*}
             <SaldoButton text="Saldo: -1261"/>
             </View>
             <View style={{flex: 10}}>
             {this.state.view}
             </View>
             </View>*/
        );
    }

    _renderScene(route, navigator) {
        switch (route.id) {
            case 'Home':
                return ( <Home navigator={navigator}/> );

            case 'Settings':
                return ( <Settings navigator={navigator}/>);
        }
    }
}

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                style={styles.navBarLeftButton}
                onPress={() => {
                    _emitter.emit('openMenu');
                }}>
                <Icon name="list-ul" size={30} color={'white'}/>
            </TouchableOpacity>
        );
    },

    RightButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                style={styles.navBarRightButton}

                onPress={(() => (Alert.alert('About', 'Created by Unknown Host.\n\nDevelopers:\n' +
                    'Christian Moeslund, chmoe13@student.sdu.dk\nJonatan Møller jogoe12@student.sdu.dk\n\n' +
                    'Other duderinos:\nAndreas Munk Jensen, Ehsanullah Ekhlas, Erik Zijdemans, Søren Anthony')))}
            >
                {/*Image er hardcoded, og ikke i vector*/}
                <Image style={{resizeMode: 'contain', width: 40, height: 40}} source={require('./imada-logo.png')}/>

                {/*  <Icon name='more-vert' size={25} color={'white'} />*/}
            </TouchableOpacity>
        );
    },

    Title(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        );
    }
};

AppRegistry.registerComponent('testproject', () => testproject);
