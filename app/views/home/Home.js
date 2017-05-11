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

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            greetingTest: 'what',
            latestActivity: [],
            account: 0,
        };

        this._beerPressed = this._beerPressed.bind(this);
        this._sodaPressed = this._sodaPressed.bind(this);
        this._onUserUpdated = this._onUserUpdated.bind(this);
        UserManager.addListener(this._onUserUpdated);
    }

    _onUserUpdated(user) {
        console.log(user);
        this.setState({
            account: user.balance,
        });
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

    render() {
        return (
            <View style={styles.backgroundImageStyle}>
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
