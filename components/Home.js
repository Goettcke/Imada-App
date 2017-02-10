import React, { Component } from 'react';
import { View, Text } from 'react-native';

import styles from '../styles/home'

class Home extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>I Dare You</Text>
            </View>
        );
    }
}

module.exports = Home;
