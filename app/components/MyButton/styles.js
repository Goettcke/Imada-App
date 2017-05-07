import React, {Component} from 'react';
import {
    StyleSheet,
} from 'react-native';

import colors from '../../config/colors';

export default StyleSheet.create({
    buttonStyle: {
        backgroundColor: colors.secondary,
        borderRadius: 2,
        flex: 1,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonTextStyle: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '500',
    },
});