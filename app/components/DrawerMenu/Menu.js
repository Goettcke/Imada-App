import React, {Component} from 'react';
import {Image, Text, View, ListView} from 'react-native';

import Button from 'react-native-button';

import styles from './styles';
import images from '../../config/images';

export default class Menu extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows(['Home', 'Settings']),
            navigate: props.navigate,
            selectedItem: 'Home',
        };
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
                            Cool Person
                        </Text>
                        <Text style={styles.headerExtra}>
                            abcde12
                        </Text>
                    </View>
                </Image>
                <ListView
                    key={this.state.selectedItem}
                    style={styles.itemContainer}
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderMenuItem(item)}
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
