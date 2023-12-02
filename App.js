import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackNavigator} from './src/navigators/AuthStackNavigator';
import {MainStackNavigator} from './src/navigators/MainStackNavigator';
// import {LabStackNavigator} from './src/navigators/LabStackNavigator';

import {createAction} from './src/utils/createAction';
import {AuthContext} from './src/contexts/AuthContext';
import {useAuth} from './src/hooks/useAuth';

// import Splash from './src/pages';

import Wellcome from './src/views/WellcomeView';
const RootStack = createStackNavigator();
import {Loading} from './src/components/atoms';

import {AppRegistry} from 'react-native';
AppRegistry.registerHeadlessTask('SomeTaskName', () =>
  require('./SomeTaskName'),
);

import io from 'socket.io-client';
import {VUE_APP_BASE_SOCKET} from './envs/local.json';
export default function ({navigation}) {
  // constructor(props) {
  //   super(props);
  //   // Don't call this.setState() here!
  //   this.state = { counter: 0 };
  //   this.handleClick = this.handleClick.bind(this);
  // }

  const {auth, state} = useAuth();
  if (!state.validateUsr) {
    auth.validation();
  }

  if (state.user) {
    const userDt = state.user;
    const this_ = this;
    this.socket = io(VUE_APP_BASE_SOCKET);
    this.socket.on('connect', () => {
      this_.socket.emit('user_join', userDt);
    });
    this.socket.on('connect_error', () => {
      setTimeout(() => {
        this_.socket.connect();
      }, 2000);
    });

    this.socket.on('message', (msg) => {
      console.log('message', msg);
    });
  }
  return (
    <AuthContext.Provider value={auth}>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          {!state.validateUsr ? (
            <RootStack.Screen name="MainStack" component={Wellcome} />
          ) : state.user ? (
            <RootStack.Screen
              name="MainStack"
              component={MainStackNavigator}
              state={state}
            />
          ) : (
            <RootStack.Screen name="AuthStack" component={AuthStackNavigator} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
      <Loading loading={state.loading} />
    </AuthContext.Provider>
  );
}
