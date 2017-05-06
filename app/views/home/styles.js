import React, {StyleSheet} from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
    backgroundImageStyle: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: colors.background,
        resizeMode: 'contain',
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: '#FFFFFF',
        padding: 8,
        fontWeight: '500',
    },
    innerContainer: {
        flex: 1,
        alignItems: 'stretch',
        padding: 8,
        opacity: 1
    },
    buttonContainer: {
        elevation: 4,
        flex: 1,
        flexDirection: 'row',
    },
    loggedOutText: {
        color: '#ffffff',
        fontSize: 25,
        textShadowColor: 'black',
    },
    loggedOutContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});