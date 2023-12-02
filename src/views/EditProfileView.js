import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Modal,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { rounded, colors } from '../utils';
import { AuthContext } from '../contexts/AuthContext';
import SettingIcon from '../assets/icon/setting.svg';
import EditIcon from '../assets/icon/pen.svg';
import Icon from 'react-native-ionicons';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export function EditProfile() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ImageBackground
      source={require('../images/Component/background.png')}
      style={styles.container}>
      <View style={styles.rec}>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.text}>
            {/* {profileObj.full_name} */}
            nama pengguna
          </Text>
          <TouchableOpacity
            onPress={() => {
              console.log('Lihat Foto');
            }}>
            <Image
              source={{ uri: 'https://reactjs.org/logo-og.png' }}
              style={styles.image}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.posmain}>
        <View style={styles.main}>
          <View style={styles.email}>
            <View style={styles.textset}>
              <Text style={styles.textemail}>Email</Text>
            </View>
            <View style={{ marginLeft: '60%', marginTop: 10 }}>
              <EditIcon width={28} height={28} fill={colors.default} />
            </View>
          </View>

          <View style={styles.hp}>
            <View style={styles.textset}>
              <Text style={styles.texthp}>No HP</Text>
            </View>
            <View style={{ marginLeft: '60%', marginTop: 10 }}>
              <EditIcon width={28} height={28} fill={colors.default} />
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 80,
            }}>
            <TouchableHighlight
              style={styles.button}
            // onPress={async () => {
            //   try {
            //     await logout();
            //     navigation.navigate('Login');
            //     setLoading(true);
            //   } catch (error) {
            //     console.log('error ==>', error);
            //     setLoading(false);
            //   }
            // }}
            >
              <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>
                Save
              </Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>

      <View style={styles.setting}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
          style={styles.setpro}>
          <Icon
            size={24}
            ios="ios-camera"
            android="md-camera"
            color={'white'}
          />
          {/* <SettingIcon width={24} height={24} color={colors.default} /> */}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={styles.centeredView}>

          <View style={styles.modalView}>
            <TouchableHighlight
              onPress={() => {
                setModalVisible(false);
              }}
              style={styles.thh}
            >
              <View>
                <Icon
                  size={35}
                  ios="ios-close-circle-outline"
                  android="md-close-circle-outline"
                  color={'red'}
                />
              </View>
            </TouchableHighlight>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%', alignItems: 'center' }}>
                <TouchableHighlight
                  onPress={() => {
                    // Open Image Library:
                    ImagePicker.launchImageLibrary(options, (response) => {
                      // Same code as in above section!
                      if (response.uri) {
                        this.setState({ photo: response });
                      }
                    });
                  }}>
                  <View style={[styles.button,{width:'100%'}]}>
                    <Icon name={'folder'} size={30} color="orange" />
                    <Text style={styles.buttontext}>From Galery</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View style={{ width: '50%', alignItems: 'center' }}>
                <TouchableHighlight
                  onPress={() => {
                    ImagePicker.launchCamera(options, (response) => {
                      console.log('response', response);
                      // Same code as in above section!
                      if (response.uri) {
                        this.setState({ photo: response });
                      }
                    });
                    // navigation.navigate('photo_camera', {
                    //   nasabahkey: this.props.params.nasabahkey,
                    // });
                  }}>
                  <View style={[styles.button,{width:'100%'}]}>
                    <Icon name={'camera'} size={30} color="orange" />
                    <Text style={styles.buttontext}>From Camera</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  email: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 40,
    borderBottomWidth: 2,
    borderBottomColor: colors.default,
    maxWidth: 300,
    marginLeft: '5%',
  },

  hp: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.default,
    maxWidth: 300,
    marginLeft: '5%',
  },
  textset: {
    width: '50%',
    height: 40,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    // margin: 20,
    backgroundColor: colors.lis,
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  thh: { 
    position: 'absolute', 
    right: -24, 
    top: -24,
    height:50,
    width:50,
    justifyContent:'center',
    alignItems:'center' },
  // password: {
  //   marginVertical: 8,
  //   height: 40,
  //   borderColor: 'transparent',
  //   borderBottomColor: 'gray',
  //   borderWidth: 1,
  //   marginVertical: 10,
  //   width: '90%',
  // },
  textemail: {
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  texthp: {
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    backgroundColor: colors.default,
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
    marginVertical: 15,
    // marginLeft: 10,
    // position: 'center',
    width: '95%',
    height: 300,

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
  setpro: {
    height: 34,
    width: 34,
    backgroundColor: colors.default,
    borderRadius: 100,
    marginTop: '-130%',
    marginLeft: '62%',
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
  setting: {
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'relative',
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

export default EditProfile;
