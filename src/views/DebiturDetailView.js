import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {setpinjmanandebitur,delpinjmanandebitur} from '../actions';

import {Card} from 'react-native-shadow-cards';

import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import number from 'numeral';
import AsyncStorage from '@react-native-community/async-storage';
import {AuthContext} from '../contexts/AuthContext';
import {rounded, colors} from '../utils';
import Styles_ from '../utils/styles';

import ButtonFun from '../components/atoms/Button';
import IconBack from '../assets/icon/icon-back.svg';

// apis
import debiturapi from '../../apis/debitur';

// components
import {Loading} from '../components/Loading';
import {PinjamanDebitur} from '../views/PinjamanDebitur';
import {CollectorActivity} from '../views/CollectorActivityView';
import debitur from '../../apis/debitur';

class DebiturDetail extends Component {
  state = {
    loading: true,
    debInfo: {},
    angsuran: undefined,
    jaminan: undefined,
  };
  componentDidMount = async () => {
    if (this.props.params) {
      const {debitur, dispatch} = this.props;
      const {nasabahkey} = this.props.params;
      const result = debiturapi.detail(nasabahkey);
      const this_ = this;
      // START get info debitur from state
      this_.setState({
        debInfo: debitur,
        loading: false,
      });
      // END

      result.then(
        (value) => {
          const dtSet = value[0];
          const debInfo = dtSet[0][0];
          const angsuran = dtSet[1];
          const jaminan = dtSet[2];
          this_.setState({
            debInfo: debInfo,
            angsuran: angsuran,
            jaminan: jaminan,
            loading: false,
          });
        },
        (reason) => {
          alert(reason);
          this_.setState({loading: false});
        },
      );
      
      dispatch(delpinjmanandebitur());
      const pinjaman = await debiturapi.pinjamanaktif(debitur.nasabahkey);
      dispatch(setpinjmanandebitur(pinjaman));
    }
  };
  render() {
    const {navigation, debitur} = this.props;
    return (
      <SafeAreaView style={Styles_.containerflex}>
        <View style={Styles_.topbarflat}>
          <ButtonFun
            type="BackBtn"
            name="Back"
            onPress={() => navigation.navigate('Debitur')}
          />
          {debitur.CustName ? (
            <Text style={styles.text}>{debitur.CustName}</Text>
          ) : (
            <></>
          )}
        </View>
        <ScrollView>
          <View style={{paddingHorizontal: 10}}>
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
                }}>
                <Text style={styles.title}>Angsuran</Text>
              </View>
              {!this.state.angsuran ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text>Loading ...</Text>
                </View>
              ) : (
                <View style={{padding: 10}}>
                  {this.state.angsuran.map((item, index) => {
                    return (
                      <View key={index} style={{marginBottom: 10}}>
                        <View>
                          <Text>No Kontrak </Text>
                          <Text style={styles.contentText}>
                            {item.no_kontrak.trim()}
                          </Text>
                        </View>
                        <View>
                          <Text>Angsuran Ke </Text>
                          <Text style={styles.contentText}>
                            {item.angsuran_ke}
                          </Text>
                        </View>
                        <View>
                          <Text>Tgl Jth. Tempo </Text>
                          <Text style={styles.contentText}>
                            {moment(item.tgl_jttempo).format('DD MMM YYYY')}
                          </Text>
                        </View>
                        <View>
                          <Text>Angsuran </Text>
                          <Text style={styles.contentAmount}>
                            {number(item.angsuran).format('0,0.00')}
                          </Text>
                        </View>
                        <View>
                          <Text>Denda </Text>
                          <Text style={styles.contentAmount}>
                            {number(item.akum_denda).format('0,0.00')}
                          </Text>
                        </View>
                        <View
                          style={{
                            borderBottomColor: '#d3d3d3',
                            borderBottomWidth: 2,
                          }}>
                          <Text>TOTAL</Text>
                          <Text style={styles.contentAmount}>
                            {number(item.akum_denda + item.angsuran).format(
                              '0,0.00',
                            )}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </Card>
            <Card style={{width: '100%', marginBottom: 20}}>
              <View
                style={{
                  backgroundColor: '#e6f2ff',
                  padding: 10,
                  marginBottom: 5,
                }}>
                <Text style={styles.title}>Jaminan</Text>
              </View>
              {!this.state.jaminan ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <Text>Loading...</Text>
                </View>
              ) : (
                <View style={{padding: 10}}>
                  {this.state.jaminan.map((item, index) => {
                    return (
                      <View key={index}>
                        <View>
                          <Text>Nama Jaminan </Text>
                          <Text style={styles.contentText}>
                            {item.namajaminan ? item.namajaminan.trim() : ''}
                          </Text>
                        </View>
                        <View>
                          <Text>Tipe Jaminan </Text>
                          <Text style={styles.contentText}>
                            {item.tipejaminan || '-'}
                          </Text>
                        </View>
                        <View>
                          <Text>Nilai Jaminan </Text>
                          <Text style={styles.contentAmount}>
                            {number(item.nilaijaminan).format('0,0.00')}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </Card>
          </View>
        </ScrollView>
        <Loading loading={this.state.loading} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  contentAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Rajdhani',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 31,
    textAlign: 'center',
    color: colors.default,
  },
  detdep: {
    position: 'absolute',
  },
});

const mapStateToProps = (state) => {
  return {
    debitur: state.debitur,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   add: (food) => dispatch(addFood(food))
  };
};

export default connect(mapStateToProps)(function ({
  route,
  props,
  debitur,
  type,
  onPress,
  dispatch,
}) {
  const navigation = useNavigation();
  return (
    <DebiturDetail
      style={styles.detdep}
      {...props}
      navigation={navigation}
      params={route.params}
      debitur={debitur}
      dispatch={dispatch}
    />
  );
});
