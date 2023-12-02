/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View,Text,ImageBackground, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// components
import {BottomTabNav, Card, DebiturClosest} from '../components/atoms';

// views
import Labs from '../views/LabsView';
import {TabsView} from '../views/TabsView';
import {Home} from '../views/HomeView';
import Debitur from '../views/DebiturView';
import Angsuran from '../views/AngsuranView';
import Pelunasan from '../views/PelunasanView';
import {Profile} from '../views/ProfileView';
import DebiturDetail from '../views/DebiturDetailView';
import PelunasanDetail from '../views/PelunasanDetailView';
import UpdateCollectorAct from '../views/CollectorActUpdateView';

// import PhotoCamera from '../views/PhotoCameraView';
const mainStack = createStackNavigator();
export function LabStackNavigator({navigation}) {
  return (
    <ImageBackground
    // source={require('../images/Component/background.png')}
    style={styles.container}
    >
      <mainStack.Navigator
        mode={'modal'}
        screenOptions={{
          headerShown: false,
        }}
        >
        <mainStack.Screen name="Home" component={Home} />
        <mainStack.Screen name="Debitur" component={Debitur} />
        <mainStack.Screen name="Angsuran" component={Angsuran} />
        <mainStack.Screen name="Pelunasan" component={Pelunasan} />
        <mainStack.Screen name="Profile" component={Profile} />
        <mainStack.Screen
          name="debitur_detail"
          component={DebiturDetail}
          options={{title: 'Detail Debitur', headerShown: true}}
        />
        <mainStack.Screen
          name="pelunasan_detail"
          component={PelunasanDetail}
          options={{title: 'Detail Pelunasan', headerShown: false}}
        />
        <mainStack.Screen
          name="collector_activity_update"
          component={UpdateCollectorAct}
          options={{title: 'Update Activity', headerShown: true}}
        />
        {/* <mainStack.Screen
        name="photo_camera"
        component={PhotoCamera}
        options={{title: 'Take Picture', headerShown: true}}
      /> */}
      </mainStack.Navigator>
      <BottomTabNav/>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  }
});
