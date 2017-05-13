import React, {Component} from 'react';
import {
    AppRegistry,
    Alert,
} from 'react-native';

import {EventEmitter} from 'fbemitter';

import Settings from './views/Settings';
import Home from './views/home/Home';

let _emitter = new EventEmitter();
import DrawerLayout from './layouts/DrawerLayout';

import UserManager from './helpers/UserManager';


export default class ImadaApp extends Component {
    async componentDidMount() {
        await UserManager.userSignOut();
        await UserManager.getCurrentUser();

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
            <DrawerLayout
                rightButtonPress={ () => this.navBarRightButtonPressed }
                renderContent={ (route, navigator) => this.renderSceneView(route, navigator) }
            />
        );
    }

    renderSceneView(route, navigator) {
        switch (route.id) {
            case 'Home':
                return ( <Home navigator={navigator}/> );

            case 'Settings':
                return ( <Settings navigator={navigator}/>);
        }
    }

    navBarRightButtonPressed() {
        Alert.alert('About', 'Created by Unknown Host.\n\nDevelopers:\n' +
            'Christian Moeslund, chmoe13@student.sdu.dk\nJonatan Møller jogoe12@student.sdu.dk\n\n' +
            'Other duderinos:\nAndreas Munk Jensen, Ehsanullah Ekhlas, Erik Zijdemans, Søren Anthony')
    }
}
