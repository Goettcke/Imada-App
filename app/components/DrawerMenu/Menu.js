import React, {Component} from 'react';
import {Image, Text, View, ListView} from 'react-native';

import Button from 'react-native-button';

import styles from './styles';
import images from '../../config/images';

import UserManager from '../../helpers/UserManager';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows(['Home', 'Settings']),
            navigate: props.navigate,
            selectedItem: 'Home',
            userName: '',
            userEmail: 'not signed in',
        };

        this._onItemSelect = this._onItemSelect.bind(this);
        this._renderMenuItem = this._renderMenuItem.bind(this);

        UserManager.addListener((user) => this.onUserChanged(user));
    }

    onUserChanged(newUser) {
        if (newUser !== null) {
            this.setState({
                userName: newUser.username,
                userEmail: newUser.email,
            });
        } else {
            this.setState({
                userName: '',
                userEmail: 'not signed in',
            });
        }
    }

    _renderMenuItem(item) {
        let style = styles.menuItem;
        if (this.state.selectedItem === item) {
            style = [styles.menuItem, styles.selectedItem];
        }
        return (
            <Button title={item} style={style} onPress={() => this._onItemSelect(item)}>
                {item}
            </Button>
        );
    }

    _onItemSelect(item) {
        this.state.navigate(item);
        this.setSelected(item);
    }

    setSelected(item) {
        this.setState({selectedItem: item});
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={images.imadaLogo} style={styles.userInfoContainer}>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerName}>
                            {this.state.userName}
                        </Text>
                        <Text style={styles.headerExtra}>
                            {this.state.userEmail}
                        </Text>
                    </View>
                </Image>
                <ListView
                    key={this.state.selectedItem}
                    style={styles.itemContainer}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderMenuItem}
                    scrollEnabled={false}
                />
                <Text>
                    {this.state.selectedItem}
                </Text>
            </View>
        );
    }
}

module.exports = Menu;
