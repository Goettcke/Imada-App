import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
} from 'react-native';

import colors from '../config/colors';

export default class MyButton extends Component {
    static propTypes = {
        text: React.PropTypes.string.isRequired,
        onPress: React.PropTypes.func,
    }

    render() {
        const formattedText = this.props.text.toUpperCase();
        return (
            <TouchableNativeFeedback onPress={this.props.onPress}>
                <View style={[styles.buttonStyle, this.props.style]}>
                    <Text style={[styles.buttonTextStyle, this.props.textStyle]}>{formattedText}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        backgroundColor: colors.secondary,
        borderRadius: 2,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,

    },
    buttonTextStyle: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '500',
    },
});
