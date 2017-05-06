import React, {Component} from 'react';
import {
    Image,
    View,
    Text,
    Button,
} from 'react-native';

import MyButton from '../../components/MyButton.js';
import styles from './styles';

import images from '../../config/images';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            greetingTest: 'what',
        };
    }

    render() {
        return (
            <Image source={images.imadaLogo} style={styles.backgroundImageStyle}>
                <View style={{flex: 10, backgroundColor: 'transparent'}}>
                </View>
                <View style={{flex: 5, opacity: 1}}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.innerContainer}>
                            <MyButton text="Sodavand"/>
                        </View>
                        <View style={styles.innerContainer}>
                            <MyButton text="Øl"/>
                        </View>
                    </View>
                </View>
            </Image>
        );
    }
}
