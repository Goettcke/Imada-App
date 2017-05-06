import React from 'react';
import {
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import images from '../config/images';

export default function (leftButtonPressed, rightButtonPressed) {
    return {
        LeftButton(route, navigator, index, navState) {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={leftButtonPressed}>
                    <Icon name="menu" size={28} color={'white'}/>
                </TouchableOpacity>
            );
        },

        RightButton(route, navigator, index, navState) {
            return (
                <TouchableOpacity
                    style={styles.button}
                    onPress={rightButtonPressed}>
                    {/*Image er hardcoded, og ikke i vector*/}
                    <Image style={{resizeMode: 'contain', width: 38, height: 38}}
                           source={images.imadaLogo}/>

                    {/*  <Icon name='more-vert' size={25} color={'white'} />*/}
                </TouchableOpacity>
            );
        },

        Title(route, navigator, index, navState) {
            return (
                <Text style={[styles.title]}>
                    {route.title}
                </Text>
            );
        }
    };
}

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#9c27b0',
        flex: 1,
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },
    title: {
        fontSize: 20,
        paddingTop: 12,
        color: 'white',
    },
    button: {
        padding: 12,
    },
});
