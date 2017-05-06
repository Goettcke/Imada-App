/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    View,
    AppRegistry,
    Text,
    TouchableHighlight,
    Navigator,
    Alert,
} from 'react-native';

import Drawer from 'react-native-drawer';
import {EventEmitter} from 'fbemitter';

import Settings from './app/views/Settings.js';
import Home from './app/views/Home.js';
import getRoute from './app/helpers/getRoute';
import createNavigationBarMapper from './app/helpers/createNavigationBarMapper';
import styles from './app/config/styles';
import Menu from './app/components/DrawerMenu/Menu';
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
        };
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={<Menu navigate={(route) => {
                    this._navigator.push(getRoute(route));
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
                            routeMapper={ createNavigationBarMapper(() => { this.navBarLeftButtonPressed(); }, () => { this.navBarRightButtonPressed(); }) }/>
                    }
                />
            </Drawer>
        );
    }

    _renderScene(route, navigator) {
        return (
            <View style={styles.mainContainer}>
                {this._renderSceneView(route, navigator)}
            </View>
        );
    }

    _renderSceneView(route, navigator) {
        switch (route.id) {
            case 'Home':
                return ( <Home navigator={navigator}/> );

            case 'Settings':
                return ( <Settings navigator={navigator}/>);
        }
    }

    navBarLeftButtonPressed() {
        _emitter.emit('openMenu');
    }

    navBarRightButtonPressed() {
        Alert.alert('About', 'Created by Unknown Host.\n\nDevelopers:\n' +
            'Christian Moeslund, chmoe13@student.sdu.dk\nJonatan Møller jogoe12@student.sdu.dk\n\n' +
            'Other duderinos:\nAndreas Munk Jensen, Ehsanullah Ekhlas, Erik Zijdemans, Søren Anthony')
    }
}

AppRegistry.registerComponent('testproject', () => testproject);
