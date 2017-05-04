import { StyleSheet } from 'react-native';
import {darkBlue} from '../config/constants.js';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    navBar: {
        backgroundColor: '#9c27b0',
    },
    navBarText: {
        color: 'white',
        fontSize: 16,
        marginVertical: 10,
    },
    navBarTitleText: {
        fontWeight: '500',
        marginVertical: 9,
    },
    navBarLeftButton: {
        paddingLeft: 10,
        paddingTop: 10,
    },
    navBarRightButton: {
        padding: 10,
        paddingTop: 5
    },
    scene: {
        flex: 1,
        paddingTop: 63,
    },
    mainContainer: {
        flex: 1,
        backgroundColor: darkBlue,
    },
    topView: {
        /* borderBottomWidth: 2,
         * borderBottomColor: 'purple',*/
        flexDirection: 'row',
        flex: 1,
        backgroundColor: darkBlue,
        elevation: 5,
        /* borderWidth: 1,
         * borderColor: 'black',*/
    },
    settingsButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingsButtonText: {
        fontSize: 20,
        color: 'black'
    },
    saldoButtonStyle: {
        /* borderWidth: 1,
         * borderColor: 'black',*/
        borderRadius: 4,
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    saldoButtonTextStyle: {
        textAlign: 'right',
        color: 'black',
        padding: 8,
        fontSize: 15,
        fontWeight: '500',
    },
});
