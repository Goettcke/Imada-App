import React, { Component } from 'react';
import {
    Text,
    View,
} from 'react-native';

import {
    LoginButton,
} from 'react-native-fbsdk';

export default class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                    <Text style={{flex: 1, fontSize: 30}}>
                        Facebook:
                    </Text>
                    <LoginButton/>
                </View>
            </View>
        );
    }
}
