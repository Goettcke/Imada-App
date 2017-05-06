import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
    container: {
        backgroundColor: '#FFF',
        paddingTop: 8,
        paddingHorizontal: 16,
    },
    menuItem: {
        alignItems: 'center',
        paddingVertical: 14,
        height: 48,
        color: '#333',
        textAlign: 'left',
        fontSize: 14,
    },
    userInfoContainer: {
        height: 128,
        justifyContent: 'center',
        opacity: 1,
        width: null,
        flex: 1,
    },
    headerTextContainer: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingLeft: 16,
        paddingTop: 72,
    },
    headerName: {
        fontSize: 14,
        color:'black',
        fontWeight: '500',
    },
    headerExtra: {
        fontSize: 14,
        color: 'black',
        fontWeight: '300',
    },
    headerBackground: {
        flex: 1,
        resizeMode: 'cover',
    }
});