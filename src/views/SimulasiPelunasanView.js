import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {useNavigation} from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import {Card} from 'react-native-shadow-cards';
import Icon from 'react-native-ionicons';
import {rounded, colors} from '../utils';

import {connect} from 'react-redux';

import ButtonFun from '../components/atoms/Button';
import Styles_ from '../utils/styles';

class SimulasiPelunasan extends Component {
  state = {
    selectedpinjamankey: undefined,
    selectedpinjaman: {},
    pinjaman: [
      {
        no_kontrak: 'Pilih Pinjaman',
        pinjamankey: 0,
      },
    ],
    mode: 'date',
    show: false,
    frmDt: {
      tglpelunasan: new Date(),
    },
  };
  componentDidMount() {
    this.setState({
      pinjaman: this.state.pinjaman.concat(this.props.pinjamandebitur),
    });
    console.log('this.props.pinjamandebitur,', this.props.pinjamandebitur);
  }
  render() {
    const {navigation} = this.props;
    const {selectedpinjaman, frmDt, mode, show} = this.state;
    const {tglpelunasan} = this.state.frmDt;
    const toggleDate = (event) => {
      this.setState({show: !show});
    };
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || tglpelunasan;
      frmDt.tglpelunasan = currentDate;
      this.setState({show: Platform.OS === 'ios', frmDt});
    };
    const calculate = () => {
      const frmDt = this.state.frmDt;
      console.log('frmDt', frmDt);
    };
    return (
      <SafeAreaView style={Styles_.containerflex}>
        <View style={Styles_.topbarflat}>
          <ButtonFun
            type="BackBtn"
            name="Back"
            onPress={() => navigation.navigate('debitur_detail')}
          />
          <Text style={Styles_.topbartext}>Simulasi Pelunasan</Text>
        </View>
        <ScrollView>
          <View style={{padding: 5}}>
            <Card style={{padding: 10, width: '100%', marginBottom: 5}}>
              <Text>Pilih Pinjaman</Text>
              <View
                style={{
                  borderWidth: 0.7,
                  borderBottomColor: 'black',
                  justifyContent: 'center',
                }}>
                <Picker
                  selectedValue={this.state.selectedpinjamankey}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemIndex > 0) {
                      frmDt.pinjamankey = itemValue;
                      this.setState({
                        selectedpinjamankey: itemValue,
                        selectedpinjaman: this.state.pinjaman[itemIndex],
                        frmDt,
                      });
                    }
                  }}>
                  {this.state.pinjaman.map((item, index) => {
                    return (
                      <Picker.Item
                        label={item.no_kontrak}
                        value={item.pinjamankey}
                        key={index}
                        style={{color: 'red'}}
                      />
                    );
                  })}
                </Picker>
              </View>
              <View>
                <Text>No Kontrak </Text>
                <Text style={styles.contentText}>
                  {selectedpinjaman.no_kontrak || '-'}
                </Text>
              </View>
              <View>
                <Text>Penggunaan</Text>
                <Text style={styles.contentText}>
                  {selectedpinjaman.uraian || '-'}
                </Text>
              </View>
              <View>
                <Text>Model Pinjaman</Text>
                <Text style={styles.contentText}>
                  {selectedpinjaman.model_pinjaman || '-'}
                </Text>
              </View>
              <View>
                <Text>Tgl. Pelunasan</Text>
                <TouchableOpacity
                  onPress={toggleDate}
                  style={{
                    borderWidth: 0.7,
                    borderBottomColor: 'black',
                    paddingHorizontal: 10,
                    height: 50,
                    justifyContent: 'center',
                  }}>
                  <Text>{moment(tglpelunasan).format('DD MMMM YYYY')}</Text>
                  <View style={{position: 'absolute', right: 10}}>
                    <Icon ios="ios-calendar" android="md-calendar" />
                  </View>
                </TouchableOpacity>
              </View>
              {show ? (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={tglpelunasan}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
              ) : (
                <></>
              )}
              <TouchableOpacity
                onPress={calculate}
                style={{
                  borderWidth: 0.7,
                  borderBottomColor: 'black',
                  paddingHorizontal: 10,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  flexDirection: 'row',
                  borderRadius: 5,
                  backgroundColor: colors.default,
                }}>
                <View style={{marginRight: 4}}>
                  <Icon ios="ios-calculator" android="md-calculator" />
                </View>
                <Text>Kalkulasi</Text>
              </TouchableOpacity>
            </Card>
            <Card style={{padding: 10, width: '100%', marginBottom: 5}}>
              <View
                style={{
                  borderBottomWidth: 0.7,
                  paddingVertical: 5,
                  marginBottom: 5,
                }}>
                <Text>Sampai Hari Ini</Text>
              </View>
              {this.state.selectedpinjaman.model_pinjaman === 'PAB' ? (
                <>
                  <View>
                    <Text>Sisa Pinjaman/Angsuran</Text>
                    <Text style={styles.contentText}>IDR 1.000.000,00</Text>
                  </View>
                  <View>
                    <Text>Total Denda</Text>
                    <Text style={styles.contentText}>IDR 1.000.000,00</Text>
                  </View>
                </>
              ) : (
                <>
                  <View>
                    <Text>Saldo Pokok</Text>
                    <Text style={styles.contentText}>IDR 1.000.000,00</Text>
                  </View>
                  <View>
                    <Text>Total Bunga & OD</Text>
                    <Text style={styles.contentText}>IDR 1.000.000,00</Text>
                  </View>
                </>
              )}
            </Card>
            <Card style={{padding: 10, width: '100%', marginBottom: 20}}>
              <View style={{borderBottomWidth: 0.7, paddingVertical: 5}}>
                <Text>
                  Sampai {moment(tglpelunasan).format('DD MMMM YYYY')}
                </Text>
              </View>
              {this.state.selectedpinjaman.model_pinjaman === 'PAB' ? (
                <>
                  <View>
                    <Text>Sisa Pinjaman/Angsuran</Text>
                    <Text style={styles.contentText}>IDR 1.000.000,00</Text>
                  </View>
                  <View>
                    <Text>Total Denda</Text>
                    <Text style={styles.contentText}>IDR 1.000.000,00</Text>
                  </View>
                </>
              ) : (
                <>
                  <View>
                    <Text>Saldo Pokok</Text>
                    <Text style={styles.contentText}>IDR 1.000.000,00</Text>
                  </View>
                  <View>
                    <Text>Total Bunga & OD</Text>
                    <Text style={styles.contentText}>IDR 1.000.000,00</Text>
                  </View>
                </>
              )}
              <View>
                <Text>Total Pelunasan</Text>
                <Text style={styles.contentText}>IDR 1.000.000,00</Text>
              </View>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  contentText: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const mapStateToProps = (state) => {
  return {
    debitur: state.debitur,
    pinjamandebitur: state.pinjamandebitur,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    //   add: (food) => dispatch(addFood(food))
  };
};
export default connect(mapStateToProps)(function ({
  dispatch,
  route,
  props,
  debitur,
  pinjamandebitur,
}) {
  const navigation = useNavigation();
  return (
    <SimulasiPelunasan
      {...props}
      navigation={navigation}
      params={route.params}
      useRoute={route}
      dispatch={dispatch}
      debitur={debitur}
      pinjamandebitur={pinjamandebitur}
    />
  );
});
