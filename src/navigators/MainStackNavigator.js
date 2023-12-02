/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Button, ImageBackground, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import IconBack from '../assets/icon/icon-back.svg';
import {rounded, colors} from '../utils';

// components
import {BottomTabNav} from '../components/atoms';

// views
import {Home} from '../views/HomeView';
import Debitur from '../views/DebiturView';
import Angsuran from '../views/AngsuranView';
import Pelunasan from '../views/PelunasanView';
import Profile from '../views/ProfileView';
import DebiturDetail from '../views/DebiturDetailView';
import PelunasanDetail from '../views/PelunasanDetailView';
import UpdateCollectorAct from '../views/CollectorActUpdateView';
import CollectorHistoryActivity from '../views/CollectorHistoryActivityView';
import PinjamanAktif from '../views/PinjamanAktifView';
import SimulasiPelunasan from '../views/SimulasiPelunasanView';
import EmergencyContact from '../views/EmergencyContactView';
import EditProfile from '../views/EditProfileView';
// import Labs from '../views/LabsView'

const MyCustomHeaderBackImage = () => {
  return (
    <View>
      <IconBack width={35} height={30} fill={'black'} />
    </View>
  );
};
const mainStack = createStackNavigator();
export function MainStackNavigator({navigation, props}) {
  return (
    <ImageBackground
      // source={require('../images/Component/background.png')}
      style={styles.container}>
      <mainStack.Navigator
        mode={'modal'}
        screenOptions={{
          headerShown: false,
        }}>
        <mainStack.Screen name="Home" component={Home} />
        <mainStack.Screen name="Debitur" component={Debitur} />
        <mainStack.Screen name="Angsuran" component={Angsuran} />
        <mainStack.Screen name="Pelunasan" component={Pelunasan} />
        <mainStack.Screen name="Profile" component={Profile} />
        <mainStack.Screen
          name="EditProfile"
          component={EditProfile}
          screenOptions={{BottomTabNav: false}}
        />
        <mainStack.Screen
          name="debitur_detail"
          component={DebiturDetail}
          options={{title: 'Detail Debitur', headerShown: false}}
        />
        <mainStack.Screen
          name="pelunasan_detail"
          component={PelunasanDetail}
          options={{title: 'Detail Pelunasan', headerShown: false}}
        />
        <mainStack.Screen
          name="collector_activity_update"
          component={UpdateCollectorAct}
          options={{title: 'Update Activity'}}
        />
        <mainStack.Screen
          name="collector_activity_history"
          component={CollectorHistoryActivity}
          options={{title: 'History Activity'}}
        />
        <mainStack.Screen
          {...props}
          name="pinjaman_aktif"
          title="Pinjaman AKtif"
          component={PinjamanAktif}
          options={{title: 'Pinjaman AKtif'}}
        />
        <mainStack.Screen
          name="simulasi_pelunasan"
          component={SimulasiPelunasan}
          options={{title: 'Simulasi Pelunasan'}}
        />
        <mainStack.Screen
          name="emergency_contact"
          component={EmergencyContact}
          options={{title: 'Emergency Contact'}}
        />
      </mainStack.Navigator>
      <BottomTabNav />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
});
