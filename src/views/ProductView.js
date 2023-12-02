import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {Heading} from '../components/Heading';
import {Error} from '../components/Error';
import {IconBtn} from '../components/Icon';
import {AuthContainer} from '../components/AuthContainer';
import {Loading} from '../components/Loading';

import {AuthContext} from '../contexts/AuthContext';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
const Tab = createMaterialBottomTabNavigator();
import {Home} from '../views/HomeView';


export function ProductView({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Settings" component={Home} />
    </Tab.Navigator>
  );
}
