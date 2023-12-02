import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Login} from '../views/LoginView';
import {Home} from '../views/HomeView';
import {Registration} from '../views/RegistrationView';

const AuthStack = createStackNavigator();
const LoginStack = createStackNavigator();

export function AuthStackNavigator() {
  return (
    <AuthStack.Navigator
      mode={'modal'}
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name={'LoginStack'}>
        {() => (
          <LoginStack.Navigator
            mode={'card'}
            screenOptions={{
              headerShown: false,
            }}>
            <LoginStack.Screen name={'Login'} component={Login} />
          </LoginStack.Navigator>
        )}
      </AuthStack.Screen>
      <AuthStack.Screen name={'Home'} component={Home} />
      <AuthStack.Screen name={'Registration'} component={Registration} />
    </AuthStack.Navigator>
  );
}
