import React, {Component} from 'react';
import {Image, Text, View, ListView} from 'react-native';

import Button from 'react-native-button';

import styles from '../styles/Menu';

var _navigate;
export default class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        _navigate = this.props.navigate;
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['Home', 'Settings'])
        });
    }

    _renderMenuItem(item) {
        return (
            <Button title={item} style={styles.itemContainer} onPress={() => this._onItemSelect(item)}>
                {item}
            </Button>
        );
    }

    _onItemSelect(item) {
        _navigate(item);
    }

    render() {
        return (
            <View>
                <Image source={require('../images/imada-logo.png')} style={styles.userInfoContainer}>
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
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this._renderMenuItem(item)}
                />
            </View>
        );
    }
}

module.exports = Menu;
