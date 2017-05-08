import {EventEmitter} from 'fbemitter';

class UserManager {
    currentUser = {
        signedIn: false,
    };
    listeners = [];
    emitter = new EventEmitter();

    async userLogin(email, password) {
        let response = await fetch('http://192.168.1.178:3000/api/ImadaUsers/login', {
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
        console.log(responseJson);

        if (responseJson.error !== undefined) {
            return {
                code: responseJson.error.code,
                message: responseJson.error.message,
                statusCode: responseJson.error.statusCode,
            };
        }

        this.currentUser = {
            userId: responseJson.userId,
            token: responseJson.id,
            email: email,
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