import React, {Component, PropTypes} from 'react';
import {
    Modal,
    Text,
    TextInput,
    Button,
    View,
} from 'react-native';

import colors from '../config/colors';

export default class RegisterModal extends Component {
    state = {
        visible: false,
        name: '',
        email: '',
        password: '',
        passwordRepeat: '',
    };

    static propTypes = {
        registerPressed: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
        backPressed: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

        this.nameInputChanged = this.nameInputChanged.bind(this);
        this.emailInputChanged = this.emailInputChanged.bind(this);
        this.passwordInputChanged = this.passwordInputChanged.bind(this);
        this.passwordRepeatInputChanged = this.passwordRepeatInputChanged.bind(this);
        this.buttonPressed = this.buttonPressed.bind(this);
    }

    buttonPressed() {
        console.log(this.state);
        this.props.registerPressed(this.state.name, this.state.email, this.state.password, this.state.passwordRepeat);
    }

    nameInputChanged(text) {
        this.setState({
            name: text,
        });
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

    passwordRepeatInputChanged(text) {
        this.setState({
            passwordRepeat: text,
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
                    this.props.backPressed();
                }}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <View style={{backgroundColor: colors.highBackground, padding: 16, margin: 16, flex: 1,}}>
                        <Text style={{fontSize: 24, paddingBottom: 8, fontWeight: '500',}}>Register</Text>
                        <Text>Name</Text>
                        <TextInput
                            value={this.state.name}
                            onChangeText={this.nameInputChanged}
                            keyboardType={'email-address'}
                            height={48}
                            autoCapitalize={'none'}
                        />
                        <Text>Email</Text>
                        <TextInput
                            value={this.state.email}
                            onChangeText={this.emailInputChanged}
                            keyboardType={'email-address'}
                            height={48}
                            autoCapitalize={'none'}
                        />
                        <Text>Password</Text>
                        <TextInput
                            value={this.state.password}
                            onChangeText={this.passwordInputChanged}
                            secureTextEntry={true}
                            autoCapitalize={'none'}
                            height={48}
                            autoCorrect={false}
                        />
                        <Text>Repeat password</Text>
                        <TextInput
                            value={this.state.passwordRepeat}
                            onChangeText={this.passwordRepeatInputChanged}
                            secureTextEntry={true}
                            autoCapitalize={'none'}
                            height={48}
                            autoCorrect={false}
                        />

                        <View style={{flexDirection: 'row', justifyContent: 'center',}}>
                            <Button title="Register" onPress={this.buttonPressed} style={{flex: 1,}}/>
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
