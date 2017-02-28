package com.testproject;

import android.app.Application;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.amazonaws.reactnative.core.AWSRNCorePackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

// Facebook SDK imports START <---
import android.content.Intent;
import android.os.Bundle;

import com.facebook.CallbackManager;
import com.facebook.FacebookSdk;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;
// Facebook SDK imports END    --->

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        FacebookSdk.sdkInitialize(getApplicationContext());
        // If you want to use AppEventsLogger to log events.
        // AppEventsLogger.activateApp(this);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
            @Override
            protected boolean getUseDeveloperSupport() {
                return BuildConfig.DEBUG;
            }

            @Override
            protected List<ReactPackage> getPackages() {
                return Arrays.<ReactPackage>asList(
                    new FBSDKPackage(mCallbackManager),
                    new MainReactPackage(),
                    new AWSRNCorePackage()
                );
            }
        };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
