import React, {Component} from 'react';
import {
    Image,
    View,
} from 'react-native';

import MyButton from '../../components/MyButton/MyButton';
import styles from './styles';

import images from '../../config/images';
import colors from '../../config/colors';

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
                <View style={{flex: 4, opacity: 1}}>
                    <View style={styles.buttonContainer}>
                        <MyButton style={{backgroundColor: colors.secondary}} text="Sodavand"/>
                        <MyButton style={{backgroundColor: colors.secondaryDark}} text="Øl"/>
                    </View>
                </View>
            </Image>
        );
    }
}
