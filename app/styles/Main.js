import { StyleSheet } from 'react-native';
import {darkBlue} from '../config/constants.js';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    mainContainer: {
        flex: 1,
        paddingTop: 56,
    },
    navBar: {
        backgroundColor: '#9c27b0',
        flex: 1,
        height: 56,
        paddingHorizontal: 16,
        flexDirection:'row',
        alignItems: 'center',
    },
    navBarTitleText: {
        fontSize: 20,
        paddingTop: 12,
        color: 'white',
    },
    navBarLeftButton: {
        padding: 12,
    },
    navBarRightButton: {
        padding: 7,
    },
    scene: {
        flex: 1,
        paddingTop: 63,
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
