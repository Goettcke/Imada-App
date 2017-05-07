import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
} from 'react-native';

import Button from 'react-native-button';
import MyButton from '../../components/MyButton/MyButton';
import styles from './styles';

import images from '../../config/images';
import colors from '../../config/colors';
import ActivityList from "../../components/ActivityList";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            greetingTest: 'what',
            latestActivity: [],
        };
    }

    _updateActivities(itemId) {
        const newActivities = this.state.latestActivity.slice();
        newActivities.unshift(itemId);
        this.setState({latestActivity: newActivities});
    }

    render() {
        return (
            <Image source={images.imadaLogo} style={styles.backgroundImageStyle}>
                <View style={{backgroundColor: 'transparent', flexDirection: 'row',}}>
                    <Text style={styles.saldoText}>
                        12345 kr
                    </Text>
                </View>
                <ActivityList
                    itemList={this.state.latestActivity}/>
                <View style={{height: 150}}>
                    <View style={styles.buttonContainer}>
                        <MyButton
                            text="Sodavand"
                            style={{backgroundColor: colors.secondary}}
                            onPress={() => {
                                this._updateActivities('soda');
                            }}/>
                        <MyButton
                            text="Øl"
                            style={{backgroundColor: colors.secondaryDark}}
                            onPress={() => {
                                this._updateActivities('beer');
                            }}/>
                    </View>
                </View>
            </Image>
        );
    }
}
