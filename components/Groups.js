/**
 * Created by jogoe12 on 2/20/2017.
 */
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/home'

class Groups extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Groups Screen</Text>
            </View>
        );
    }
}

module.exports = Groups;