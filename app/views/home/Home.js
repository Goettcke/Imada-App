import React, {Component} from 'react';
import {
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

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            greetingTest: 'what',
            latestActivity: [],
            account: 0,
            signInVisible: true,
        };

        this._beerPressed = this._beerPressed.bind(this);
        this._sodaPressed = this._sodaPressed.bind(this);
        this._onUserUpdated = this._onUserUpdated.bind(this);
        UserManager.addListener(this._onUserUpdated);
    }

    _onUserUpdated(user) {
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

    async loginButtonPressed() {
        let response = await UserManager.userSignIn(this.state.email, this.state.password);

        this.setState({
            status: response.message,
        });
    }

    render() {
        return (
            <View style={styles.backgroundImageStyle}>
                <SignInModal
                    signInPressed={async () => {
                        await this.loginButtonPressed();
                    }}
                    visible={this.state.signInVisible}/>
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
