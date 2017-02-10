import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    /* Image,*/
    View,
    ScrollView,
    /* Alert,*/
    /* Button,
     * Dimensions,*/
    TouchableHighlight,
    TouchableNativeFeedback,
    ListView,
} from 'react-native';
 import Button from 'react-native-button'

export default class Menu extends Component {
     constructor(props) {
         super(props);
         this.state = {
             dataSource: new ListView.DataSource({
                 rowHasChanged: (row1, row2) => row1 !== row2
             })
         };
     }


     _renderMenuItem(item) {
         return (
             <Button onPress={() => this._onItemSelect(item)}>{item}</Button>
         );
     }

     _onItemSelect(item) {
         // Add the code to push a scene in navigation stack, we’ll do it in a few
     }


     componentDidMount() {
         this.setState({
             dataSource: this.state.dataSource.cloneWithRows(['Home', 'Challenges'])
         });
     }

     render() {
         return (
             <ListView
                 dataSource={this.state.dataSource}
                 renderRow={(item) => this._renderMenuItem(item)}
             />
         );
     }


 }