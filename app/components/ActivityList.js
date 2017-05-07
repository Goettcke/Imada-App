import React, {Component, PropTypes} from 'react';
import {Image, Text, View, ListView, StyleSheet} from 'react-native';

import Button from 'react-native-button';

import images from '../config/images';
import items from '../config/items';

export default class ActivityList extends Component {
    static propTypes = {
        onButtonPressed: PropTypes.func,
        itemList: PropTypes.arrayOf(PropTypes.string),
    };

    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.state = {
            dataSource: dataSource.cloneWithRows(props.itemList),
            navigate: props.navigate,
            selectedItem: 'Home',
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('what');
        const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
        this.setState({
            dataSource: dataSource.cloneWithRows(nextProps.itemList),
        });
        console.log(this.state.dataSource);
    }

    _renderMenuItem(itemId) {
        const item = items.get(itemId);
        return (
            <View style={styles.item}>
                <Text>{item.label} - {item.price}kr</Text>
                <Button onPress={() => {
                    this.props.onButtonPressed(itemId);
                }}>Anuller</Button>
            </View>
        );
    }

    render() {
        return (
            <ListView
                style={[styles.container, this.props.style]}
                dataSource={this.state.dataSource}
                renderRow={(item) => this._renderMenuItem(item)}
                scrollEnabled={false}
                enableEmptySections={true}/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        margin: 8,
        elevation: 1
    },
    item: {
        padding: 16,
        paddingBottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
