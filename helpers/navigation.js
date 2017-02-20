import React, { Platform } from 'react-native';
import _ from 'underscore';

module.exports = function (scene) {
    var componentMap = {
        'Home': {
            title: 'Home',
            id: 'Home'
        },
        'Challenges': {
            title: 'Dares',
            id: 'Challenges'
        },
        'Settings': {
            title: 'Settings',
            id: 'Settings'
        },
        'Groups': {
            title: 'Groups',
            id: 'Groups'
        }
    }

    return componentMap[scene];
}
