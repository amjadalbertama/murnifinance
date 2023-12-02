import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
  Dimensions
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../contexts/AuthContext';
import {rounded, colors} from '../utils';
import ButtonEdit from '../components/atoms/Button';
import EditProfile from '../views/EditProfileView';
import Styles_ from '../utils/styles';
import Iconphone from '../assets/icon/phone.svg';
import Iconmail from '../assets/icon/mail.svg';
import useSelector from 'react-redux';
import {connect} from 'react-redux';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';

function LandingPage({navigation}) {
  const [profileObj, setProfileObj] = React.useState({});
  const route = useRoute();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      setProfileObj(JSON.parse(jsonValue));
    } catch (e) {
      // error reading value
    }
  };

  // const globalState = useSelector((state) => state);

  getData();
  return (
    <ImageBackground
      // source={require('../images/Component/background.png')}
      style={styles.container}>
      <View style={styles.rec}></View>
      <View style={styles.posmain}>
        <View style={styles.main}>
        <View style={styles.position_image}>
         <Image
           source={{uri: 'https://reactjs.org/logo-og.png'}}
           style={styles.image}
         />
       </View>

       <View style={styles.position_maintext}>
        <Text style={styles.text}>{profileObj.full_name}</Text>
       </View>
       <View style={styles.pos_line}>
         <View style={styles.line}></View>
       </View>
          
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginTop: 40,
            }}>
            <View style={{width: "15%", height: 50}}>
              <Iconmail width={30} height={30} fill={colors.default}/>
            </View>
            <View style={{width: '70%', height: 50}}>
              <Text style={{color: colors.default, fontSize: 16}}>budiarianto.wp@gmail.com</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <View style={{width: '15%', height: 50}}>
            <Iconphone width={30} height={26.5} fill={colors.default}/>
            </View>
            <View style={{width: '70%', height: 50}}>
              <Text style={{color: colors.default, fontSize: 15}}>085810232337</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.setting}>
          <ButtonEdit
            type="EditBtn"
            name="Edit"
            // onPress={() => navigation.push('labs')}
            onPress={() => navigation.toggleDrawer()}
          />
      </View>
    </ImageBackground>
  );
}
function Feed({navigation}) {
  return (
    <LandingPage navigation={navigation} />
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>Feed Screen</Text>
    //   <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
    //   <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    // </View>
  );
}

function Notifications({navigation}) {
  return (
       <ImageBackground 
        source={require('../images/Component/background.png')} 
        style={styles.bg_EditPassword}>
        <View style={styles.com_EditPassword}>
          <View style={styles.grup_EditPassword}>
            <View style={styles.stl_EditPassword}>
              <Text style={styles.text_EditPasword}>Old Password</Text>
              <TextInput
                style={styles.input}
                placeholder={'Old Password'}
                // keyboardType={'email-address'}
              />
            </View>
            <View style={styles.stl_EditPassword}>
              <Text style={styles.text_EditPasword}>New Password</Text>
              <TextInput
                style={styles.input}
                placeholder={'New Password'}
                // keyboardType={'email-address'}
              />
            </View>
            <View style={styles.stl_EditPassword}>
              <Text style={styles.text_EditPasword}>Konfirmasi Password</Text>
              <TextInput
                style={styles.input}
                placeholder={'Konfirmasi Password'}
                // keyboardType={'email-address'}
              />
            </View>
            <View style={styles.stl_EditPassword}>
              <View style={Styles_.space(40)}/>
              <TouchableHighlight
                  style={styles.buttonLogout}
                  onPress={async () => {
                    try {
                      // await logout();
                    } catch (error) {
                      // console.log('error ==>', error);
                      // setLoading(false);
                    }
                  }}>
                  <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
                    Ganti Password
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => navigation.navigate('Profile')}>
                  <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
                    Cancel
                  </Text>
                </TouchableHighlight>
            </View>
          </View>
        </View>
    </ImageBackground>
   
  );
}

function LogOutConf({navigation}) {
  const {logout} = React.useContext(AuthContext);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Apakah kamu yakin akan keluar ?</Text>
      <TouchableHighlight
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
          Cancel
        </Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.buttonLogout}
        onPress={async () => {
          try {
            await logout();
          } catch (error) {
            // console.log('error ==>', error);
            // setLoading(false);
          }
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
          Logout
        </Text>
      </TouchableHighlight>
    </View>
  );
}

function CustomDrawerContent(props) {
  return (

    
    <DrawerContentScrollView {...props}>
     
      <DrawerItemList {...props} />
      {/* <DrawerItem
        label="Close drawer"
        onPress={() => props.navigation.closeDrawer()}
      />
      <DrawerItem
        label="Toggle drawer"
        onPress={() => props.navigation.toggleDrawer()}
      /> */}
    </DrawerContentScrollView>
    
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return ( 
      <Drawer.Navigator 
        drawerContent={(props) => 
        <CustomDrawerContent {...props} />}
        drawerPosition="right">
        <Drawer.Screen 
          name="Profile"
          options={{ title: 'Budi Arianto'}}
          component={Feed}
        />
        <Drawer.Screen
          name="EditProfile"
          options={{title: 'Edit'}}
          component={EditProfile}
        />
        <Drawer.Screen name="Ganti Password" component={Notifications} />
        <Drawer.Screen name="Logout" component={LogOutConf} />
      </Drawer.Navigator>
  );
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.default
  },
  button: {
    width: 265,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: '5%',
  },
  buttonLogout: {
    width: 265,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: '5%',
    backgroundColor: colors.default
  },
  posmain: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    marginTop: -0.20 * height,
    width: 0.90 * width,
    height: '90%',
    borderRadius: rounded.large,
    backgroundColor: colors.background,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,
    elevation: 20,
  },
  position_image:{
    marginTop: -0.15 * height,
    alignItems: 'center'
  },
  position_maintext:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -0.05 * height,
    paddingBottom: 20,
    // borderColor: colors.default,
    // borderBottomWidth: 2,
    // width: 0.50 * width
  },
  pos_line:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  line:{
    marginTop: -0.005 * height,
    borderColor: colors.default,
    borderBottomWidth: 2,
    width: 0.70 * width
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
  rec: {
    height: 0.30 * height,
    width: '100%',
    backgroundColor: colors.lis,
    borderBottomLeftRadius: rounded.large,
    borderBottomRightRadius: rounded.large,
  },
  text: {
    marginTop: '10%',
    marginBottom: 5,
    fontSize: 22,
    lineHeight: 27,
    fontFamily: 'Pridi',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: colors.default,
  },
  setting: {
    marginLeft: 0.85 * width,
    position: 'absolute',
    // width: width,
    top: 20,
  },
  setpro: {
    height: 60,
    width: 60,
    backgroundColor: colors.default,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,
    elevation: 20,
  },

  image: {
    borderColor: colors.default,
    borderRadius: 85,
    borderWidth: 8,
    height: 160,
    marginBottom: '5%',
    width: 160,
    marginTop: '4%',
  },
  input: {
    width: 265,
    height: 44,
    borderWidth: 3,
    borderColor: colors.default,
    borderRadius: 15,
    paddingVertical: 12,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Roboto',
    color: colors.default,
  },
  // Style Edit Password
  bg_EditPassword: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center'
  },
  com_EditPassword: {
    width: '90%', 
    height:'90%', 
    borderRadius: rounded.medium,
    backgroundColor: colors.background,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,
    elevation: 20,
  },
  stl_EditPassword: {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
  },
  grup_EditPassword:{
    marginVertical: '20%'
  },
  text_EditPasword: {
    color: colors.default,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18
    
  }
});

export default function Profile() {
  return <MyDrawer />;
}
