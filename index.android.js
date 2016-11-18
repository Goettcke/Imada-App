/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Button,
    Dimensions,
    TouchableHighlight
} from 'react-native';

class MyButton extends Component {
    static propTypes = {
        text: React.PropTypes.string.isRequired,
        onPress: React.PropTypes.func,
    }
    render() {
        const formattedText = this.props.text.toUpperCase();
        return (
            <TouchableHighlight onPress={this.props.onPress} style={styles.buttonStyle}>
                <Text style={styles.buttonTextStyle}>{formattedText}</Text>
            </TouchableHighlight>
        );
    }
}

export default class testproject extends Component {

    constructor(props) {
        super(props);
        this.state = { textToShow: "Button 1" };
    }

    changeState(text) {
        this.setState({textToShow: text});
    }

    render() {
        var url = { uri: "http://www.imada.sdu.dk/~jogoe12/images/IMADA_FAGRAAD_LOGO2.png" }
        return (
            <View style={styles.mainContainer}>
                <View style={{flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "grey"}}>
                    <Text style={{fontSize: 50}}>
                        {this.state.textToShow}
                    </Text>
                </View>
                <View style={{flex: 1}}>
                    <View style={styles.buttonContainer}>
                        <View style={styles.innerContainer}>
                            <MyButton onPress={() => this.changeState("Button 1")} text="Button 1"/>
                        </View>
                        <View style={styles.innerContainer}>
                            <MyButton onPress={() => this.changeState("Button 2")} text="Button 2"/>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.innerContainer}>
                            <MyButton onPress={() => this.changeState("Button 3")} text="Button 3"/>
                        </View>
                        <View style={styles.innerContainer}>
                            <MyButton onPress={() => this.changeState("Button 4")} text="Button 4"/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    buttonStyle: {
        elevation: 4,
        backgroundColor: '#2196F3',
        borderRadius: 6,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: 'white',
        padding: 8,
        fontWeight: '500',
    },
    innerContainer: {
        flex: 1,
        borderColor: "purple",
        alignItems: "stretch",
    },
    buttonContainer: {
        flex: 1,
        flexDirection: "row",
    }
});

AppRegistry.registerComponent('testproject', () => testproject);
