import {EventEmitter} from 'fbemitter';
import {serverAddress} from '../config/settings';

class UserManager {
    currentUser = {
        signedIn: false,
    };
    emitter = new EventEmitter();

    async userLogin(email, password) {
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
        console.log(userInfo);

        this.currentUser = {
            userId: responseJson.userId,
            token: responseJson.id,
            email: userInfo.email,
            username: userInfo.username,
            signedIn: true,
        };

        this.emitter.emit('userChanged', this.currentUser);

        return {
            code: 'SUCCESS',
            message: `signed in as ${responseJson.userId}`,
            statusCode: 200,
            user: this.currentUser,
        };
    }

    addListener(func) {
        return this.emitter.addListener('userChanged', func);
    }
}

const currentUserManager = new UserManager();

export default currentUserManager;
