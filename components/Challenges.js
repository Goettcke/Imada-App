import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/home'

class Challenges extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Challenges Screen</Text>
            </View>
        );
    }
}

module.exports = Challenges;
