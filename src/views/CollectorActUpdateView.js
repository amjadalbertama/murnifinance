import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import number from 'numeral';
import Icon from 'react-native-ionicons';
// import Exif from 'react-native-exif';
import ImagePicker from 'react-native-image-picker';
import Geolocation from '@react-native-community/geolocation';

// apis
import debitur from '../../apis/debitur';

// components
import {Loading} from '../components/Loading';

import ButtonFun from '../components/atoms/Button';
import Styles_ from '../utils/styles';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

let coords_ = {};
class UpdateCollectorActivity extends Component {
  state = {
    loading: true,
    debInfo: {},
    image: null,
    activitydesc: null,
    longitude: null,
    latitude: null,
    altitude: null,
    photo: null,
  };
  static getDerivedStateFromProps(props, state) {
    Geolocation.getCurrentPosition((position) => {
      const {coords} = position;
      coords_ = coords;
      return {
        longitude: coords.longitude || null,
        latitude: coords.latitude || null,
        altitude: coords.altitude || null,
      };
    });
    return null;
  }
  componentDidMount = () => {
    // console.log('!componentDidMount collector update');
    if (this.props.params) {
      try {
        const {nasabahkey} = this.props.params;
        const result = debitur.detail(nasabahkey);
        const this_ = this;
        result.then(
          (value) => {
            const dtSet = value[0];
            const debInfo = dtSet[0][0];
            this_.setState({debInfo: debInfo, loading: false});
          },
          (reason) => {
            this_.setState({loading: false});
            console.error(reason); // Error!
          },
        );
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  // componentDidUpdate = () => {
  //   console.log('componentDidUpdate');
  // };
  // componentWillUnmount = () => {
  //   console.log('componentDidUpdate');
  // };
  save = () => {
    const {navigation} = this.props;
    const {photo} = this.state;
    const this_ = this;
    this_.setState({loading: true});
    const result = debitur.updateActivity({
      nasabahkey: this.props.params.nasabahkey,
      image: `data:${photo.type};base64,` + photo.data,
      activitydesc: this.state.activitydesc,
      latitude: photo.latitude || coords_.latitude,
      longitude: photo.longitude || coords_.longitude,
      altitude: photo.altitude || coords_.altitude,
    });
    result.then(
      (value) => {
        this_.setState({loading: false});
        navigation.goBack();
      },
      (reason) => {
        this_.setState({loading: false});
        console.error(reason); // Error!
      },
    );
  };
  render() {
    const {navigation} = this.props;
    const {photo} = this.state;

    return (
      <SafeAreaView style={Styles_.containerflex}>
        <View style={Styles_.topbarflat}>
          <ButtonFun
            type="BackBtn"
            name="Back"
            onPress={() => navigation.navigate('debitur_detail')}
          />
          <Text style={Styles_.topbartext}>Update Activity</Text>
        </View>
        <ScrollView>
          <View style={{paddingHorizontal:10,marginBottom:10}}>
            <Card style={{width: '100%', marginBottom: 5, marginTop: 20}}>
              <View
                style={{
                  backgroundColor: '#e6f2ff',
                  padding: 10,
                  marginBottom: 5,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}>
                <Text style={styles.title}>Profile Debitur</Text>
              </View>
              <View style={{padding: 10}}>
                <View>
                  <Text>Debitur No.</Text>
                  <Text style={styles.contentText}>
                    {this.state.debInfo.CustCode || '-'}
                  </Text>
                </View>
                <View>
                  <Text>Nama Debitur </Text>
                  <Text style={styles.contentText}>
                    {this.state.debInfo.CustName || '-'}
                  </Text>
                </View>
                <View>
                  <Text>No Hp </Text>
                  <Text style={styles.contentText}>
                    {this.state.debInfo.nohandphone || '-'}
                  </Text>
                </View>
                <View>
                  <Text>Email</Text>
                  <Text style={styles.contentText}>
                    {this.state.debInfo.email || '-'}
                  </Text>
                </View>
              </View>
            </Card>
            <Card style={{width: '100%', marginBottom: 5}}>
              <View
                style={{
                  backgroundColor: '#e6f2ff',
                  padding: 10,
                  marginBottom: 5,
                  borderTopLeftRadius: 5,
                  borderTopRightRadius: 5,
                }}>
                <Text style={styles.title}>Update Activity</Text>
              </View>
              {(this.state.photo || '') !== '' ? (
                <View>
                  <Image
                    style={styles.logo}
                    source={{
                      uri: `data:${photo.type};base64,` + photo.data,
                    }}
                  />
                </View>
              ) : (
                <Text />
              )}

              <View style={{flexDirection: 'row'}}>
                <View style={{width: '50%'}}>
                  <TouchableHighlight
                    style={styles.buttoncontainer}
                    onPress={() => {
                      // Open Image Library:
                      ImagePicker.launchImageLibrary(options, (response) => {
                        // Same code as in above section!
                        if (response.uri) {
                          this.setState({photo: response});
                        }
                      });
                    }}>
                    <View style={styles.button}>
                      <Icon name={'folder'} size={30} color="orange" />
                      <Text style={styles.buttontext}>From Galery</Text>
                    </View>
                  </TouchableHighlight>
                </View>
                <View style={{width: '50%'}}>
                  <TouchableHighlight
                    style={styles.buttoncontainer}
                    onPress={() => {
                      ImagePicker.launchCamera(options, (response) => {
                        console.log('response',response);
                        // Same code as in above section!
                        if (response.uri) {
                          this.setState({photo: response});
                        }
                      });
                      // navigation.navigate('photo_camera', {
                      //   nasabahkey: this.props.params.nasabahkey,
                      // });
                    }}>
                    <View style={styles.button}>
                      <Icon name={'camera'} size={30} color="orange" />
                      <Text style={styles.buttontext}>From Camera</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>

              <View style={{padding: 10}}>
                <View>
                  <Text>Activity</Text>
                  <TextInput
                    style={{borderColor: 'gray', borderWidth: 1}}
                    placeholder="Masukkan rincian aktivitas"
                    multiline
                    numberOfLines={4}
                    editable
                    maxLength={40}
                    onChangeText={(text) => this.setState({activitydesc: text})}
                  />
                </View>
              </View>
            </Card>

            <TouchableHighlight
              style={styles.buttoncontainer}
              onPress={this.save}>
              <View style={styles.button}>
                <Text style={styles.buttontext}>Save</Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.buttoncontainer}
              onPress={() => {
                navigation.goBack();
              }}>
              <View style={styles.button}>
                <Text style={styles.buttontext}>Cancel</Text>
              </View>
            </TouchableHighlight>
            <Loading loading={this.state.loading} />
          </View>
        </ScrollView>
        <Loading loading={this.state.loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    // alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  contentText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttoncontainer: {
    marginTop: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttontext: {
    fontSize: 17,
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default function ({route, props}) {
  const navigation = useNavigation();
  return (
    <UpdateCollectorActivity
      {...props}
      navigation={navigation}
      params={route.params}
    />
  );
}
