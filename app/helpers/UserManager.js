import React, {AsyncStorage} from 'react-native';

import {EventEmitter} from 'fbemitter';
import {serverAddress} from '../config/settings';

class UserManager {
    _currentUser = null;
    emitter = new EventEmitter();

    async userSignIn(email, password) {
        let response = await fetch(`${serverAddress}/api/ImadaUsers/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        });

        let responseJson = await response.json();

        if (responseJson.error !== undefined) {
            return {
                code: responseJson.error.code,
                message: responseJson.error.message,
                statusCode: responseJson.error.statusCode,
            };
        }

        let userInfoResponse = await fetch(`${serverAddress}/api/ImadaUsers/${responseJson.userId}?access_token=${responseJson.id}`);

        let userInfo = await userInfoResponse.json();

        await this.setCurrentUser(
            responseJson.id,
            responseJson.userId,
            userInfo.email,
            userInfo.username,
            userInfo.balance,
        );

        return {
            code: 'SUCCESS',
            message: `signed in as ${responseJson.userId}`,
            statusCode: 200,
            user: this._currentUser,
        };
    }

    async userSignOut() {
        if (this._currentUser === null) return;

        await fetch(`${serverAddress}/api/ImadaUsers/logout?${this._currentUser.token}`, {
            method: 'POST',
        });

        this._currentUser = null;
        this.emitter.emit('userChanged', this._currentUser);

        await AsyncStorage.multiRemove(['token', 'userId', 'email', 'username', 'balance'], (errors) => {
            console.log(errors);
        });
    }

    async userRegister(name, email, password) {
        let response = await fetch(`${serverAddress}/api/ImadaUsers/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: name,
                email: email,
                password: password,
            })
        });

        return await response.json();
    }

    addListener(func) {
        return this.emitter.addListener('userChanged', func);
    }

    async setCurrentUser(token, userId, email, username, balance) {
        this._currentUser = {
            token: token,
            userId: userId,
            email: email,
            username: username,
            balance: balance,
        };

        console.log(this._currentUser);

        this.emitter.emit('userChanged', this._currentUser);

        await AsyncStorage.multiSet([['token', token], ['userId', String(userId)], ['email', email], ['username', username], ['balance', String(balance)]],
            (errors) => {
                console.log(errors);
            });
    }

    async getCurrentUser() {
        if (this._currentUser === null) {
            try {
                const token = await AsyncStorage.getItem('token');

                if (token !== null) {
                    let email = null, username = null, userId = null, balance = null;
                    await AsyncStorage.multiGet(['email', 'username', 'userId', 'balance'], (err, stores) => {
                        stores.map((result, i, store) => {
                            email = store[0][1];
                            username = store[1][1];
                            userId = store[2][1];
                            balance = Number(store[3][1]);
                        });

                        console.log(err);
                    });

                    if (email !== null && username !== null && userId !== null && balance !== null) {
                        console.log(`${serverAddress}/api/ImadaUsers/${userId}?access_token=${token}`);
                        let userInfo = await fetch(`${serverAddress}/api/ImadaUsers/${userId}?access_token=${token}`);
                        let userInfoJson = await userInfo.json();

                        if (userInfoJson.error !== undefined) {
                            return null;
                        }

                        console.log(userInfoJson);
                        balance = userInfoJson.balance;

                        await this.setCurrentUser(token, userId, email, username, balance);
                        return this._currentUser;
                    } else {
                        return null;
                    }
                }
                else {
                    return null;
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            return this._currentUser;
        }
    }
}

const currentUserManager = new UserManager();

export default currentUserManager;
