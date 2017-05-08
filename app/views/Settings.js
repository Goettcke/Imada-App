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

    componentDidMount() {
        this.setState({
            userListener: UserManager.addListener((user) => {
                this.onUserChanged(user);
            })
        });
    }

    componentWillUnmount() {
        this.state.userListener.remove();
    }

    onUserChanged(newUser) {
        console.log(newUser);
    }

    render() {
        return (
            <View style={{padding: 16,}}>
                <Text>Email</Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={(text) => this.setState({email: text,})}
                    keyboardType={'email-address'}
                />
                <Text>Password</Text>
                <TextInput
                    value={this.state.password}
                    onChangeText={(text) => this.setState({password: text,})}
                    secureTextEntry={true}
                />
                <Button title="Log ind" onPress={async () => {
                    let response = await UserManager.userLogin(this.state.email, this.state.password);

                    this.setState({
                        status: response.message,
                    });
                }}/>

                <Text style={{fontSize: 14, color: 'black'}}>
                    {this.state.status}
                </Text>
            </View>
        );
    }
}
