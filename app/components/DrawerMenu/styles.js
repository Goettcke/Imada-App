import {StyleSheet} from 'react-native';
import colors from '../../config/colors';

export default StyleSheet.create({
    container: {
        backgroundColor: colors.highBackground,
        flex: 1,
        elevation: 16,
    },
    itemContainer: {
        backgroundColor: colors.highBackground,
    },
    menuItem: {
        alignItems: 'center',
        paddingVertical: 14,
        height: 48,
        color: colors.primaryText,
        textAlign: 'left',
        fontSize: 14,
        backgroundColor: colors.highBackground,
        paddingHorizontal: 16,
    },
    selectedItem: {
        backgroundColor: 'rgba(0, 0, 0, 0.26)',
    },
    userInfoContainer: {
        height: 128,
        justifyContent: 'center',
        opacity: 1,
        width: null,
    },
    headerTextContainer: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingLeft: 16,
        paddingTop: 80,
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