/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet} from 'react-native';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
const Tab = createMaterialBottomTabNavigator();

import {Profile} from '../views/ProfileView';
import {Home} from '../views/HomeView';
import Debitur from '../views/DebiturView';
import Angsuran from '../views/AngsuranView';
import Pelunasan from '../views/PelunasanView';
// import IconHome from '../assets/icon/home.svg';
// import IconPelunasan from '../assets/icon/pelunasan.svg';
// import IconJtempo from '../assets/icon/jatuh-tempo.svg';
// import IconDebitor from '../assets/icon/debitor.svg';
// import IconAkun from '../assets/icon/akun.svg';
import { max } from 'moment';
import {colors} from '../utils';


const DebiturStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AngsuranStack = createStackNavigator();
const PelunasanStack = createStackNavigator();
export function TabsView({props}) {
  return (
    <Tab.Navigator >
      <Tab.Screen
        name="Home"
        options={{
          tabBarColor: 'white',
          tabBarIcon: () => (
            // <MaterialCommunityIcons name="home" color={color} size={26} />
            <Icon/>
          ),
        }}>
        {() => (
          <HomeStack.Navigator
            mode={'modal'}
            screenOptions={{
              headerShown: false,
            }}>
            <HomeStack.Screen name="Home" component={Home} />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Pelunasan"
        // component={Pelunasan}
        options={{
          tabBarColor: 'white',
          tabBarIcon: () => (
            // <MaterialCommunityIcons name="bell" color={color} size={26} />
            <Icon/>
          ),
        }}>
        {() => (
          <PelunasanStack.Navigator>
            <PelunasanStack.Screen
              name="list_pelunasan"
              component={Pelunasan}
              options={{title: 'List Pelunasan'}}
            />
          </PelunasanStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Angsuran"
        options={{
          tabBarColor: 'white',
          tabBarIcon: () => (
          <Icon/>
          ),
        }}>
        {({props}) => (
          <AngsuranStack.Navigator>
            <AngsuranStack.Screen
              name="List Angsuran"
              component={Angsuran}
              test="test"
            />
          </AngsuranStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Debitur"
        options={{
          tabBarColor: 'white',
          borderRadius: 25,
          tabBarIcon: () => (
          <Icon/>
          ),
        }}>
        {() => (
          <DebiturStack.Navigator mode={'modal'}>
            <DebiturStack.Screen name="List Debitur" component={Debitur} />
          </DebiturStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: 'white',
          tabBarIcon: () => (
          <Icon/>
          ),
        }}>
        {/* {() => (
            <ProfileStack.Navigator>
              <ProfileStack.Screen name="Profile" component={Profile} />
            </ProfileStack.Navigator>
          )} */}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({

  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  password: {
    marginVertical: 8,
    height: 40,
    borderColor: 'transparent',
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    width: '90%',
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  buttonforget: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    // marginVertical:20
  },
  buttonregister: {
    width: '90%',
    alignItems: 'flex-end',
    // justifyContent: ,
    borderRadius: 10,
    padding: 10,
    // marginVertical:20
  },
});

export default TabsView;
