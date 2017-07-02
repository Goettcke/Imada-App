import React, {Component} from 'react';
import {
    Text,
    TextInput,
    View,
    Button,
} from 'react-native';

import UserManager from '../helpers/UserManager';

export default class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            status: 'Not signed in',
            userListener: undefined,
        };
    }

    render() {
        return (
            <View style={{padding: 16,}}>
                <Button title="Sign out" onPress={async () => {
                    await UserManager.userSignOut();
                }}/>
            </View>
        );
    }
}
