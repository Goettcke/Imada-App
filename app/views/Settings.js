import React, {Component} from 'react';
import {
    Text,
    View,
} from 'react-native';

export default class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{paddingTop: 16, paddingLeft: 16}}>
                <Text style={{fontSize: 14, color: 'black'}}>
                    Here will be great checkboxes
                </Text>
            </View>
        );
    }
}
