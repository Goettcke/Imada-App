/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

//'use strict'

import React, { Component } from 'react';
import { DeviceEventEmitter, Navigator, Text, TouchableOpacity, View, AppRegistry, Image, Alert } from 'react-native';

import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/FontAwesome';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { EventEmitter } from 'fbemitter';

import Menu from './components/Menu';
import Home from './components/Home';
import Challenges from './components/Challenges';
import Settings from './components/Settings';
import Groups from './components/Groups';

import navigationHelper from './helpers/navigation';

import styles from './styles/root';

let _emitter = new EventEmitter();

class testproject extends Component {
    componentDidMount() {
        var self = this;

        _emitter.addListener('openMenu', () => {
            self._drawer.open();
        });

        _emitter.addListener('back', () => {
            self._navigator.pop();
        });
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu navigate={(route) => {
                    this._navigator.push(navigationHelper(route));
                    this._drawer.close()
                }}/>}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{
                    drawer: {shadowColor: '#000000', shadowOpacity: 1, shadowRadius: 10, backgroundColor: '#000000'},
                    main: {paddingLeft: 3}
                }}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
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
                            routeMapper={NavigationBarRouteMapper} />
                    }
                />
            </Drawer>
        );
    }

    _renderScene(route, navigator) {
        switch (route.id) {
            case 'Home':
                return ( <Home navigator={navigator}/> );

            case 'Challenges':
                return ( <Challenges navigator={navigator}/> );

            case 'Groups':
                return ( <Groups navigator={navigator}/> );

            case 'Settings':
                return ( <Settings navigator={navigator}/>);
        }
    }
}

const NavigationBarRouteMapper = {
    LeftButton(route, navigator, index, navState) {
        switch (route.id) {
            case 'Home':
                return (
                    <TouchableOpacity
                        style={styles.navBarLeftButton}
                        onPress={() => {_emitter.emit('openMenu')}}>
                        <Icon name="list-ul" size={30} color={'white'} />
                    </TouchableOpacity>
                )
            default:
                return (
                    <TouchableOpacity
                        style={styles.navBarLeftButton}
                        onPress={() => {_emitter.emit('openMenu')}}>
                        {<Icon name='list-ul' size={30} color={'white'} />}
                    </TouchableOpacity>
                )
        }
    },

    RightButton(route, navigator, index, navState) {
        return (
            <TouchableOpacity
                style={styles.navBarRightButton}

                onPress = {(() => (Alert.alert("About","Created by Unknown Host.\n\nDevelopers:\n" +
                    "Christian Moeslund, chmoe13@student.sdu.dk\nJonatan Møller jogoe12@student.sdu.dk\n\n" +
                    "Other duderinos:\nAndreas Munk Jensen, Ehsanullah Ekhlas, Erik Zijdemans, Søren Anthony")))}
            >
                {/*Image er hardcoded, og ikke i vector*/}
                <Image style={{resizeMode: 'contain', width: 40, height:40}} source={require('./logo.png')}/>

                {/*  <Icon name='more-vert' size={25} color={'white'} />*/}
            </TouchableOpacity>
        )
    },

    Title(route, navigator, index, navState) {
        return (
            <Text style={[styles.navBarText, styles.navBarTitleText]}>
                {route.title}
            </Text>
        )
    }
}

AppRegistry.registerComponent('testproject', () => testproject);
