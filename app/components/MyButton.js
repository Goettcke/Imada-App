import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableNativeFeedback,
} from 'react-native';

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
        backgroundColor: '#e53935',
        borderRadius: 6,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonTextStyle: {
        textAlign: 'center',
        color: 'white',
        padding: 8,
        fontWeight: '500',
    },
});
