import React, {Component, PropTypes} from 'react';
import {
    Modal,
    Text,
    TextInput,
    Button,
    View,
} from 'react-native';

import colors from '../config/colors';

export default class SignInModal extends Component {
    state = {
        visible: false,
        email: '',
        password: '',
    };

    static propTypes = {
        signInPressed: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
        working: PropTypes.bool.isRequired,
    };

    constructor(props) {
        super(props);

        this.emailInputChanged = this.emailInputChanged.bind(this);
        this.passwordInputChanged = this.passwordInputChanged.bind(this);
        this.loginButtonPressed = this.loginButtonPressed.bind(this);
        this.registerPressed = this.registerPressed.bind(this);
    }

    loginButtonPressed() {
        this.props.signInPressed(this.state.email, this.state.password);
    }

    registerPressed() {
        this.props.registerPressed(this.state.email, this.state.password);
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

    render() {
        return (
            <Modal
                animationType={'slide'}
                transparent={true}
                visible={this.props.visible}
                style={{backgroundColor: 'red',}}
                onRequestClose={() => {

                }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{backgroundColor: colors.highBackground, padding: 16, margin: 16, flex: 1,}}>
                        <Text style={{fontSize: 24, paddingBottom: 8, fontWeight: '500',}}>Sign in</Text>
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
                            autoCapitalize={'none'}
                            height={48}
                            placeholder={'hunter2'}
                            autoCorrect={false}
                        />

                        <View style={{flexDirection: 'row', justifyContent: 'space-between',}}>
                            <Button title="Register" onPress={this.registerPressed}
                                    style={{flex: 1,}} disabled={this.props.working}
                                    color={colors.secondary}
                            />
                            <Button title="Log ind" onPress={this.loginButtonPressed}
                                    style={{flex: 1,}} disabled={this.props.working}
                                    color={colors.secondary}
                            />
                        </View>

                        <Text style={{fontSize: 14, color: 'black'}}>
                            {this.state.status}
                        </Text>
                    </View>
                </View>
            </Modal>
        );
    }
}
