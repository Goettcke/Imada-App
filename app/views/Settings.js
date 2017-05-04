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
                <View style={{flex: 1, alignItems: 'flex-start', flexDirection: 'row', paddingTop: 16, paddingLeft: 16}}>
                    <Text style={{flex: 1, fontSize: 14, color:'black'}}>
                        Here will be great checkboxes
                    </Text>
                </View>
            </View>
        );
    }
}
