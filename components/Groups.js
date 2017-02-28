/**
 * Created by jogoe12 on 2/20/2017.
 */
import React, { Component } from 'react';

import {
    NativeModules,
    NativeAppEventEmitter,
    DeviceEventEmitter,
    View,
    Text,
    TouchableOpacity,
    Alert,
    Button} from 'react-native';


/*
* Region */

/*Most of the information on DynamoDB can be found on the
* IntegrationTest file for Dynamo in DynamoDBTests.js  */

import styles from '../styles/home'
import {AWSDynamoDB} from 'aws-sdk-react-native-dynamodb';
import {AWSCognitoCredentials} from 'aws-sdk-react-native-core';



var tables = [];
const cognitoRegion = "eu-west-1"; /*Ireland*/
const identity_pool_id = "eu-west-1_H4tlEBzUU"; /*this is our actual ID*/
const serviceRegion = "eu-central-1"; /*Frankfurt*/
var hashTableName = "HashTableExample"
var hashRangeTableName = "HashRangeTableExample";
var shouldResolve = false;

var token = '';
var supplyLogins = false;

//const db = new AWSDynamoDB;





const onButtonPress =() => {
    Alert.alert("Group created","Your Group has been created");

}

class Groups extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginMessage: "Log in! fegele",
            Authenticated: 'False',
            identityID: '',
            AccessKey: '',
            SecretKey: '',
            SessionKey: '',
            Expiration: '',
            isLoggedIn: false
        };
        AWSCognitoCredentials.identityChanged = function (Previous, Current) {
            console.log("PreviousID: " + Previous);
            console.log("CurrentID: " + Current);
        }
        AWSCognitoCredentials.getLogins = function () {
            if (supplyLogins) {
                var map = {};
                map[AWSCognitoCredentials.RNC_COGNITO_PROVIDER] = token;
                return map;
            } else {
                return "";
            }
        };
    }
        Refresh(){
            var that = this;

            async function getCredAndID() {
                try {
                    var variable = await AWSCognitoCredentials.getCredentialsAsync();
                    that.setState({
                        AccessKey: variable["AccessKey"], SecretKey: variable["SecretKey"],
                        SessionKey: variable["SessionKey"], Expiration: variable["Expiration"].toString()
                    });
                    variable = await AWSCognitoCredentials.getIdentityIDAsync();
                    console.log("IdentityID as received: " + variable);
                    that.setState({identityID: variable.identityid});
                } catch (e) {
                    console.log("Error: " + e)
                    return;
                }
            }

            getCredAndID();
            AWSCognitoCredentials.isAuthenticated(function (error, variable) {
                if (error) {
                    console.log("Error: " + error)
                } else {
                    if (variable) {
                        that.setState({Authenticated: "True"});
                    } else {
                        that.setState({Authenticated: "False"});
                    }
                }
            });
        }

        ClearCred(){
            AWSCognitoCredentials.clearCredentials();
        }
        ClearKeychain(){
            AWSCognitoCredentials.clear();
        }

        onLoginInvoked(isLoggingIn, Accesstoken){
            that = this;
            if(isLoggingIn){
                token = Accesstoken;
                supplyLogins = true;
                AWSCognitoCredentials.initWithOptions({"region":region,"identity_pool_id":identity_pool_id})
                var map = {};
                map[AWSCognitoCredentials.RNC_COGNITO_PROVIDER] = token;
                AWSCognitoCredentials.setLogins(map); //ignored for iOS
                return;
            }else{
                supplyLogins = false;
            }

    }

    render(){

       console.log("logging group view");


        //TODO Faktisk at få et brugbart login-token?
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