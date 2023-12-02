import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../contexts/AuthContext';
import {rounded, colors} from '../utils';
import ButtonEdit from '../components/atoms/Button';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function Profile({navigation}) {
  const {logout} = React.useContext(AuthContext);
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
  getData();
  return (
    <ImageBackground
      source={require('../images/Component/background.png')}
      style={styles.container}>
      <View style={styles.rec}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.text}>{profileObj.full_name}</Text>
          <Image
            source={{uri: 'https://reactjs.org/logo-og.png'}}
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.posmain}>
        <View style={styles.main}>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 20,
              marginTop: 40,
            }}>
            <View style={{width: '50%', height: 50}}>
              <Text>Email</Text>
            </View>
            <View style={{width: '50%', height: 50}}>
              <Text>budiarianto.wp@gmail.com</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
            <View style={{width: '50%', height: 50}}>
              <Text>No HP</Text>
            </View>
            <View style={{width: '50%', height: 50}}>
              <Text>085810232337</Text>
            </View>
          </View>
          {/* <TouchableHighlight
            style={styles.button}
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
          </TouchableHighlight> */}
        </View>
      </View>
      <View style={styles.setting}>
        <View style={styles.setpro}>
          <ButtonEdit
            type="EditBtn"
            name="Edit"
            // onPress={() => navigation.push('labs')}
            onPress={() => navigation.toggleDrawer()}
          />
        </View>
      </View>
    </ImageBackground>
  );
}
function Feed({navigation}) {
  return (
    <Profile navigation={navigation}/>
    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <Text>Feed Screen</Text>
    //   <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
    //   <Button title="Toggle drawer" onPress={() => navigation.toggleDrawer()} />
    // </View>
  );
}

function Notifications() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Notifications Screen</Text>
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
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerPosition="right">
      <Drawer.Screen name="Edit" component={Feed} />
      <Drawer.Screen name="Ganti Password" component={Notifications} />
      <Drawer.Screen name="Logout" component={Notifications} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    marginHorizontal: '5%',
  },
  posmain: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    marginVertical: -140,
    // marginLeft: 10,
    // position: 'center',
    width: '95%',
    height: '90%',
    borderRadius: rounded.large,
    backgroundColor: colors.background,
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
    height: 300,
    width: '100%',
    backgroundColor: colors.background,
    borderBottomLeftRadius: rounded.large,
    borderBottomRightRadius: rounded.large,
  },
  text: {
    marginTop: '10%',
    marginBottom: 5,
    fontSize: 24,
    lineHeight: 27,
    fontFamily: 'Pridi',
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: colors.default,
  },
  setting: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    top: 270,
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
    borderWidth: 7,
    height: 160,
    marginBottom: '5%',
    width: 160,
    marginTop: '4%',
  },
});

export default function Labs() {
  return <MyDrawer />;
}
