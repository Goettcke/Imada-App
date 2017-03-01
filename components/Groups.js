/**
 * Created by jogoe12 on 2/20/2017.
 */
import React, { Component } from 'react';

import {
    View,
    Text,
    Alert,
    Button
} from 'react-native';


/*
* Region */

/*Most of the information on DynamoDB can be found on the
* IntegrationTest file for Dynamo in DynamoDBTests.js  */


import styles from '../styles/home'
import {AWSDynamoDB} from 'aws-sdk-react-native-dynamodb';
import {AWSCognitoCredentials} from 'aws-sdk-react-native-core'

var tables = [];
const cognitoRegion = "eu-west-1"; /*Ireland*/
const identity_pool_id = "eu-west-1_H4tlEBzUU"; /*this is our actual ID*/
const serviceRegion = "eu-central-1"; /*Frankfurt*/
var hashTableName = "HashTableExample"
var hashRangeTableName = "HashRangeTableExample";
var shouldResolve = false;



const onButtonPress =() => {
    Alert.alert("Group created","Your Group has been created");
}

class Groups extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Text>Groups View</Text>
                <Button
                    onPress={onButtonPress}
                    title="Create Group"
                    color = '#8000A8'
                    accessibilityLabel="See an informative alert"
                />
            </View>

        );
    }
}

module.exports = Groups;