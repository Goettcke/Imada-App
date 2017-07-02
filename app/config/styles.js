import { StyleSheet } from 'react-native';
import colors from './colors';

export default StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 56,
        backgroundColor: colors.background,
    },
    navBar: {
        backgroundColor: colors.primary,
        flex: 1,
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },
    text: {
        color: colors.primaryText,
    }
});
