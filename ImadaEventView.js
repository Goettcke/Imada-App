import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl
} from 'react-native';

import {
    GraphRequest,
    GraphRequestManager,
    AccessToken,
} from 'react-native-fbsdk';


import {imadaStudentsGroupId} from './constants.js';

const styles = StyleSheet.create({
    scrollViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    eventStyle: {
        color: 'white',
        fontSize: 20
    },
    notLoggedIn: {
        color: 'white',
        fontSize: 20,
    }
});

export default class ImadaEventView extends Component {

    constructor(props) {
        super(props);
        // This is required to bind the current `this` context to the function
        // such that it works as expected when it is called by the GraphRequest thing
        // internally
        this.setEventList = this.setEventList.bind(this);
        this.performRequest = this.performRequest.bind(this);
        var eventRequest = new GraphRequest(
            '/' + imadaStudentsGroupId + '/events',
            null,
            this.setEventList
        );
        this.state = {
            eventRequest: eventRequest,
            fbLoginStatus: false,
            fbEvents: [],
            refreshing: false,
        };
    }

    componentDidMount() {
        this.checkFBLoginStatus();
    }

    async checkFBLoginStatus() {
        var result = await AccessToken.getCurrentAccessToken();
        console.log('checkFBLoginStatus');
        if (result) {
            this.setState({fbLoginStatus: true});
        } else {
            this.setState({fbLoginStatus: false});
        }
    }

    renderNotLoggedIn() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.notLoggedIn}>Log ind med facebook for at se begivenheder</Text>
            </View>
        );
    }

    async performRequest() {
        // TODO: Can we reuse this manager somehow? Hardly any documentation about it
        var rm = new GraphRequestManager();
        this.setState({refreshing: true});
        await rm.addRequest(this.state.eventRequest).start();
    }

    setEventList(error, result) {
        this.setState({refreshing: false});
        if (error) {
            console.log('Error happened: ');
            console.log(error);
        } else {
            console.log('Received facebook events successfully.');
            this.setState({fbEvents: result.data});
        }
    }

    renderEvents() {
        var events = this.state.fbEvents.map((ev) => {
            return <Text style={styles.eventStyle} key={ev.id.toString()}>{ev.name}</Text>;
        });
        var refreshControl = <RefreshControl refreshing={this.state.refreshing} onRefresh={this.performRequest}/>;
        return (
            <ScrollView refreshControl={refreshControl} contentContainerStyle={styles.scrollViewStyle}>
                {events}
            </ScrollView>
        );
    }

    render() {
        if (this.state.fbLoginStatus) {
            return this.renderEvents();
        } else {
            return this.renderNotLoggedIn();
        }
    }
}
