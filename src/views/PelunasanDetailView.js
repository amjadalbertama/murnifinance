import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import number from 'numeral';
import ButtonFin from '../components/atoms/Button';
import {rounded, colors} from '../utils';
// apis
import debitur from '../../apis/debitur';

// components
import {Loading} from '../components/Loading';
import Button from '../components/atoms/Button';
import Iconback from '../assets/icon/icon-back.svg'
// import { TouchableOpacity } from 'react-native-gesture-handler';

class PelunasanDetail extends Component {
  state = {
    loading: false,
    debInfo: {},
    header: null,
  };
  componentDidMount = async () => {
    if (this.props.params) {
      const {pinjamankey, nasabahkey} = this.props.params;
      const result = await debitur.detail(nasabahkey);
      this.setState({debInfo: result, loading: false});
    }
  };

  render() {
    return (
      <View style={{height: '100%'}}>
        <View
          style={{alignContent: 'center', padding: 4, alignItems: 'center'}}>
          <Card style={{padding: 4}}>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%', height: 30}}>
                <Text>Name </Text>
              </View>
              <View style={{width: '70%', height: 30}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  {this.state.debInfo.CustName
                    ? this.state.debInfo.CustName.trim()
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%', height: 30}}>
                <Text>Tgl Pelunasan</Text>
              </View>
              <View style={{width: '70%', height: 30}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  {this.state.debInfo.tglpelunasan
                    ? moment(this.state.debInfo.tglpelunasan).format(
                        'DD MMM YYYY',
                      )
                    : '-'}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%', height: 30}}>
                <Text>Total Installment</Text>
              </View>
              <View style={{width: '70%', height: 30}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  {number(this.state.debInfo.ttlinstalment || 0).format(
                    '0,0.00',
                  )}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%', height: 30}}>
                <Text>Total Denda</Text>
              </View>
              <View style={{width: '70%', height: 30}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  {number(this.state.debInfo.ttllatecharge || 0).format(
                    '0,0.00',
                  )}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%', height: 30}}>
                <Text>Total Diskon</Text>
              </View>
              <View style={{width: '70%', height: 30}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  {number(this.state.debInfo.diskon_percent || 0).format(
                    '0,0.00',
                  )}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '30%', height: 30}}>
                <Text>Diskon</Text>
              </View>
              <View style={{width: '70%', height: 30}}>
                <Text style={{textAlign: 'right'}}>
                  {' '}
                  {number(this.state.debInfo.diskon_amount || 0).format(
                    '0,0.00',
                  )}
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{width: '50%', height: 30}}>
                <Text>Total Pembayaran</Text>
              </View>
              <View style={{width: '50%', height: 30}}>
                <Text style={{textAlign: 'right'}}>
                  {number(this.state.debInfo.ttlpayment || 0).format('0,0.00')}
                </Text>
              </View>
            </View>
          </Card>
        </View>
        <Loading loading={this.state.loading} />
      </View>
    );
  }
}

export default function ({route, props}) {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../images/Component/background.png')}
      style={styles.container}>
      <View style={styles.wrapper}>
        <ButtonFin
          type="BackBtn"
          name="Back"
          onPress={() => navigation.push('Pelunasan')}
        />
        <Text style={styles.text}>Detail Pelunasan</Text>
      </View>
      <PelunasanDetail
        {...props}
        navigation={navigation}
        params={route.params}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    height: '7%',
    backgroundColor: '#F3F7FF',
    borderBottomLeftRadius: rounded.large,
    borderBottomRightRadius: rounded.large,
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    alignContent:'center',
    justifyContent:'center'
  },
  text: {
    marginTop: 8,
    fontSize: 20,
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Rajdhani',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 31,
    textAlign: 'center',
    color: colors.default,
  },
  toach: {
    marginVertical: 10,
    marginLeft: 5
  }
});
