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

import moment from 'moment';

import {imadaStudentsGroupId} from './constants.js';

const styles = StyleSheet.create({
    scrollViewStyle: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    eventStyle: {
        color: 'white',
        fontSize: 15
    },
    notLoggedIn: {
        color: 'white',
        fontSize: 20,
    },
    eventContainer: {
        borderWidth: 1,
        borderColor: "purple",
        flex: 1,
        flexDirection: "column",
    },
    smallText: {
        fontSize: 10,
        color: 'white'
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

    renderEvent(ev) {
        var formattedPlace = 'N/A';
        if (ev.place && ev.place.name) {
            formattedPlace = ev.place.name;
        }
        var defaultFormat = 'dddd, MMM Do, h a';
        var startDate = moment(ev.start_time);
        var endDate  = moment(ev.end_time);
        var displayDate;
        if (ev.end_time == null) {
            displayDate = startDate.format(defaultFormat);
        } else if (startDate.date() === endDate.date()) {
            displayDate = startDate.format(defaultFormat)
                        + ' - '
                        + endDate.format('h a');
        } else {
            displayDate = startDate.format(defaultFormat)
                        + ' - '
                        + endDate.format(defaultFormat);
        }

        return (
            <View style={styles.eventContainer} key={ev.id.toString()}>
                <Text style={styles.eventStyle}>{ev.name}</Text>
                <Text style={styles.smallText}>Location: {formattedPlace}</Text>
                <Text style={styles.smallText}>Date: {displayDate}</Text>
            </View>
        );
    }

    renderEvents() {
        var events = this.state.fbEvents.map(this.renderEvent);
        var refreshControl =
            <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.performRequest}
            />;

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
