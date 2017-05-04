/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    Text,
    Image,
    TouchableHighlight,
    Navigator,
    Alert,
    TouchableOpacity
} from 'react-native';

import Drawer from 'react-native-drawer';
import {EventEmitter} from 'fbemitter';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Settings from './app/views/Settings.js';
import Home from './app/views/Home.js';
import navigationHelper from './helpers/Navigation';
import styles from './app/styles/Main';
import Menu from './app/components/Menu';

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
    componentDidMount() {

        _emitter.addListener('openMenu', () => {
            this._drawer.open();
        });

        _emitter.addListener('back', () => {
            this._navigator.pop();
        });
    }

    constructor(props) {
        super(props);

        this.state = {
            view: <Home/>,
            menuButtonText: 'Settings'
        };
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
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                panOpenMask={0.2}
                styles={{
                    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: '#FFFFFF'},
                    main: {paddingLeft: 3}
                }}
                tweenHandler={(ratio) => ({
                    mainOverlay: {opacity: ratio / 2, backgroundColor: 'black'}
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
                <Icon name="menu" size={28} color={'white'}/>
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
                <Image style={{resizeMode: 'contain', width: 38, height: 38}} source={require('./app/images/imada-logo.png')}/>

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
