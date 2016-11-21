import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    RefreshControl,
    TouchableHighlight,
    Linking,
} from 'react-native';

import {
    GraphRequest,
    GraphRequestManager,
    AccessToken,
} from 'react-native-fbsdk';

import moment from 'moment';

import {imadaStudentsGroupId} from './constants.js';

const textColor = 'black';

const styles = StyleSheet.create({
    scrollViewStyle: {
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    eventTitle: {
        color: textColor,
        fontSize: 20,
    },
    highlight: {
        borderWidth: 1,
        borderColor: textColor,
    },
    notLoggedIn: {
        color: textColor,
        fontSize: 20,
    },
    smallText: {
        fontSize: 12,
        color: textColor
    },
    eventContainer: {
        borderWidth: 1,
        borderColor: 'purple',
        flex: 1,
        flexDirection: 'row',
        shadowColor: 'grey',
        elevation: 3,
        backgroundColor: 'transparent',
        paddingLeft: 10,
    },
    eventInfoContainer: {
        flex: 3,
        height: 100,
        /* borderColor: textColor,*/
    },
    eventDescContainer: {
        flex: 2,
        borderColor: textColor,
        overflow: 'hidden',
        maxHeight: 100,
    },
    eventDescText: {
        overflow: 'hidden',
        opacity: 0.5,
        color: textColor,
    }
});

export default class ImadaEventView extends Component {

    static propTypes = {
        fbLoginStatus: React.PropTypes.bool.isRequired,
    }

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
        this.performRequest();
    }

    renderNotLoggedIn() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.notLoggedIn}>Log ind med facebook for at se begivenheder</Text>
            </View>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.fbLoginStatus !== this.props.fbLoginStatus) {
            console.log("will do request");
            this.performRequest();
        }
    }

    async performRequest() {
        // TODO: Can we reuse this manager somehow? Hardly any documentation about it
        var result = await AccessToken.getCurrentAccessToken();
        if (result) {
            var rm = new GraphRequestManager();
            this.setState({refreshing: true, fbLoginStatus: true});
            await rm.addRequest(this.state.eventRequest).start();
        } else {
            this.setState({fbLoginStatus: false});
        }
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
        var defaultFormat = 'dddd, MMM Do, HH:mm';
        var startDate = moment(ev.start_time);
        var endDate  = moment(ev.end_time);
        var displayDate;
        if (ev.end_time == null) {
            displayDate = startDate.format(defaultFormat);
        } else if (startDate.date() === endDate.date()) {
            displayDate = startDate.format(defaultFormat)
                        + ' - '
                        + endDate.format('HH:mm');
        } else {
            displayDate = startDate.format(defaultFormat)
                        + ' - '
                        + endDate.format(defaultFormat);
        }

        var evUrl = 'https://facebook.com/' + ev.id.toString();
        return (
            <TouchableHighlight key={ev.id.toString()} onPress={() => Linking.openURL(evUrl)}>
                <View style={styles.eventContainer}>
                    <View style={styles.eventInfoContainer}>
                        <Text style={[styles.eventTitle, {alignSelf: 'flex-start'}]}>{ev.name}</Text>
                        <Text style={styles.smallText}>{formattedPlace}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Text style={[ styles.smallText, {alignSelf: 'flex-end'}]}>{displayDate}</Text>
                        </View>
                    </View>
                    <View style={styles.eventDescContainer}>
                        <Text style={styles.eventDescText}>{ev.description}</Text>
                    </View>
                </View>
            </TouchableHighlight>
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
        if (this.props.fbLoginStatus) {
            return this.renderEvents();
        } else {
            return this.renderNotLoggedIn();
        }
    }
}
