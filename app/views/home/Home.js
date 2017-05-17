import React, {Component} from 'react';
import {
    Alert,
    Image,
    View,
    Text,
} from 'react-native';

import MyButton from '../../components/MyButton/MyButton';
import styles from './styles';

import colors from '../../config/colors';
import ActivityList from '../../components/ActivityList';
import UserManager from '../../helpers/UserManager';
import SignInModal from '../../components/SignInModal';
import RegisterModal from '../../components/RegisterModal';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            greetingTest: 'what',
            latestActivity: [],
            account: 0,
            signInVisible: false,
            registerVisible: false,
            working: false,
        };

        this._beerPressed = this._beerPressed.bind(this);
        this._sodaPressed = this._sodaPressed.bind(this);
        this._onUserUpdated = this._onUserUpdated.bind(this);
        UserManager.addListener(this._onUserUpdated);

        this.signInRegisterPressed = this.signInRegisterPressed.bind(this);
        this.registerButtonPressed = this.registerButtonPressed.bind(this);
    }

    async componentDidMount() {
        this._onUserUpdated(UserManager._currentUser);
        let test = await fetch('https://imada.mechagk.dk:3000/api/Messages/greet?msg=test');
        console.log(test);
    }

    _onUserUpdated(user) {
        console.log(user);
        if (user !== null) {
            this.setState({
                account: user.balance,
                signInVisible: false,
            });
        } else {
            this.setState({
                account: 0,
                signInVisible: true,
            });
        }
    }

    _updateActivities(itemId) {
        const newActivities = this.state.latestActivity.slice();
        newActivities.unshift(itemId);
        this.setState({latestActivity: newActivities});
    }

    _sodaPressed() {
        this._updateActivities('soda');
    }

    _beerPressed() {
        this._updateActivities('beer');
    }

    async loginButtonPressed(email, password) {
        if (email === '') {
            Alert.alert('Sign in failed', 'Email required');
            return;
        } else if (password === '') {
            Alert.alert('Sign in failed', 'Password required');
            return;
        }

        this.setState({
            working: true,
        });

        let response = await UserManager.userSignIn(email, password);

        this.setState({
            working: false,
        });

        if (response.code === 'SUCCESS') {
            return;
        }

        let message = '';

        if (response.code === 'LOGIN_FAILED') {
            message = 'Wrong email or password';
        }

        Alert.alert('Sign in failed', message);
    }

    async registerButtonPressed(name, email, password, passwordRepeat) {
        console.log(password + ', ' + passwordRepeat);

        let message = '';
        if (name === '') {
        } else if (email === '') {
            message = 'Email is required';
        } else if (password === '') {
            message = 'Password is required';
        } else if (passwordRepeat !== password) {
            message = 'Password fields are not identical';
        } else {
            this.setState({
                working: true,
            });

            let response = await UserManager.userRegister(name, email, password);

            this.setState({
                working: false,
            });

            if (response.error !== undefined) {
                if (response.error.statusCode === 422) {
                    message = 'Account already exists';
                } else {
                    message = 'Unknown error';
                }
                console.log(response);
            } else {
                Alert.alert('Register successful', 'User registered');

                this.setState({
                    registerVisible: false,
                });

                return;
            }
        }

        Alert.alert('Register failed', message);
    }

    signInRegisterPressed(email, password) {
        this.setState({
            registerVisible: true,
        });
    }

    render() {
        return (
            <View style={styles.backgroundImageStyle}>
                <SignInModal
                    signInPressed={async (email, password) => {
                        await this.loginButtonPressed(email, password);
                    }}
                    registerPressed={this.signInRegisterPressed}
                    visible={this.state.signInVisible}
                    working={this.state.working}/>
                <RegisterModal
                    registerPressed={this.registerButtonPressed}
                    backPressed={() => {
                        this.setState({
                            registerVisible: false,
                        });
                    }}
                    visible={this.state.registerVisible}
                    working={this.state.working}/>
                <View style={{backgroundColor: 'transparent', flexDirection: 'row',}}>
                    <Text style={styles.saldoText}>
                        {this.state.account} kr
                    </Text>
                </View>
                <ActivityList
                    itemList={this.state.latestActivity}/>
                <View style={{height: 150}}>
                    <View style={styles.buttonContainer}>
                        <MyButton
                            text="Sodavand"
                            style={{backgroundColor: colors.secondary}}
                            onPress={this._sodaPressed}/>
                        <MyButton
                            text="Øl"
                            style={{backgroundColor: colors.secondaryDark}}
                            onPress={this._beerPressed}/>
                    </View>
                </View>
            </View>
        );
    }
}
