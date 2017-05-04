import React, {Platform} from 'react-native';
import _ from 'underscore';

module.exports = function (scene) {
    const componentMap = {
        'Home': {
            title: 'Home',
            id: 'Home'
        },
        'Settings': {
            title: 'Settings',
            id: 'Settings'
        },
    };

    return componentMap[scene];
};
