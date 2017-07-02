import React from 'react-native';

export default function (scene) {
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
