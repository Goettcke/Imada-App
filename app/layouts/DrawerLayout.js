import React, {Component, PropTypes} from 'react';
import {
    Navigator,
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Platform
} from 'react-native';

import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';

import getRoute from '../helpers/getRoute';
import Menu from '../components/DrawerMenu/Menu';

import images from '../config/images';
import colors from '../config/colors';

export default class DrawerLayout extends Component {
    static propTypes = {
        rightButtonPress: PropTypes.func.isRequired,
        renderContent: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Drawer
                ref={(ref) => this._drawer = ref}
                type="overlay"
                content={ <Menu navigate={(route) => {
                    const currentRoutes = this._navigator.getCurrentRoutes();
                    const currentRoute = currentRoutes[currentRoutes.length - 1].id;

                    if (route !== currentRoute) {
                        this._navigator.push(getRoute(route));
                    }
                    this._drawer.close();
                }}/> }
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                panOpenMask={0.2}
                styles={{
                    drawer: {shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3, backgroundColor: '#FFFFFF'},
                    main: {paddingLeft: 3}
                }}
                tweenHandler={(ratio) => ({
                    mainOverlay: {opacity: ratio / 2, backgroundColor: 'black'}
                })}>
                <Navigator
                    ref={(ref) => this._navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
                    initialRoute={{
                        id: 'Home',
                        title: 'Home',
                        index: 0
                    }}
                    renderScene={(route, navigator) => this.renderContentView(route, navigator)}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.navBar}
                            routeMapper={
                                this.createNavigationBarMapper(() => {
                                    this._drawer.open();
                                }, this.props.rightButtonPress())
                            }/>
                    }
                />
            </Drawer>
        );
    }

    renderContentView(route, navigator) {
        return (
            <View style={styles.mainContainer}>
                <StatusBar
                    backgroundColor={colors.primaryDark}/>
                {this.props.renderContent(route, navigator)}
            </View>
        );
    }

    createNavigationBarMapper(leftButtonPressed, rightButtonPressed) {
        return {
            LeftButton(route, navigator, index, navState) {
                return (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={leftButtonPressed}>
                        <Icon name="menu" size={28} color={'white'}/>
                    </TouchableOpacity>
                );
            },

            RightButton(route, navigator, index, navState) {
                return (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={rightButtonPressed}>
                        {/*Image er hardcoded, og ikke i vector*/}
                        <Image style={{resizeMode: 'contain', width: 38, height: 38}}
                               source={images.imadaLogo}/>

                        {/*  <Icon name='more-vert' size={25} color={'white'} />*/}
                    </TouchableOpacity>
                );
            },

            Title(route, navigator, index, navState) {
                return (
                    <Text style={[styles.title]}>
                        {route.title}
                    </Text>
                );
            }
        };
    }
}


const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#9c27b0',
        flex: 1,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
    },
    title: {
        fontSize: 20,
        paddingTop: 12,
        color: 'white',
    },
    button: {
        padding: (Platform.OS === 'android') ? 12 : 8,
    },
    mainContainer: {
        flex: 1,
        marginTop: 56,
    }
});
