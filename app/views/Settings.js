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

        this.emailInputChanged = this.emailInputChanged.bind(this);
        this.passwordInputChanged = this.passwordInputChanged.bind(this);
        this.loginButtonPressed = this.loginButtonPressed.bind(this);
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

    emailInputChanged(text) {
        this.setState({
            email: text,
        });
    }

    passwordInputChanged(text) {
        this.setState({
            password: text,
        });
    }

    async loginButtonPressed() {
        let response = await UserManager.userLogin(this.state.email, this.state.password);

        this.setState({
            status: response.message,
        });
    }

    render() {
        return (
            <View style={{padding: 16,}}>
                <Text>Email</Text>
                <TextInput
                    value={this.state.email}
                    onChangeText={this.emailInputChanged}
                    keyboardType={'email-address'}
                    height={48}
                    autoCapitalize={'none'}
                    placeholder={'user@email.com'}
                />
                <Text>Password</Text>
                <TextInput
                    value={this.state.password}
                    onChangeText={this.passwordInputChanged}
                    secureTextEntry={true}
                    autoCapitalize={false}
                    height={48}
                    placeholder={'hunter2'}
                    autoCorrect={false}
                />
                <Button title="Log ind" onPress={this.loginButtonPressed}/>

                <Text style={{fontSize: 14, color: 'black'}}>
                    {this.state.status}
                </Text>
            </View>
        );
    }
}
