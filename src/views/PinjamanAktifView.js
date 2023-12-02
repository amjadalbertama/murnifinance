import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import number from 'numeral';

import {Loading} from '../components/Loading';
import ButtonFun from '../components/atoms/Button';
import Styles_ from '../utils/styles';
import debiturapi from '../../apis/debitur';

class PinjamanAktif extends Component {
  state = {
    pinjaman: undefined,
    loading: true,
  };
  componentDidMount() {
    const {debitur} = this.props;
    const this_ = this;
    const api = debiturapi.pinjamanaktif(debitur.nasabahkey);
    api.then(
      (value) => {
        this_.setState({pinjaman: value, loading: false});
      },
      (reason) => {
        this_.setState({loading: false});
        console.log('reason', reason);
      },
    );
  }
  render() {
    const {navigation} = this.props;
    const renderItem = ({item}) => (
      <View>
        <Card style={{width: '100%', marginTop: 5, padding: 5}}>
          <View>
            <Text>No Kontrak </Text>
            <Text style={styles.contentText}>{item.no_kontrak || '-'}</Text>
          </View>
          <View>
            <Text>Penggunaan</Text>
            <Text style={styles.contentText}>{item.uraian || '-'}</Text>
          </View>
          <View>
            <Text>Model Pinjaman</Text>
            <Text style={styles.contentText}>{item.model_pinjaman || '-'}</Text>
          </View>
          {item.model_pinjaman == 'PAB' ? (
            <>
              <View>
                <Text>Tenor</Text>
                <Text style={styles.contentText}>
                  {item.tenor || '-'} Bulan
                </Text>
              </View>
              <View>
                <Text>Bunga </Text>
                <Text style={styles.contentText}>
                  {number(item.interest_rate_year).format('0,0.00')} %
                </Text>
              </View>
              <View>
                <Text>Angsuran Per Bulan </Text>
                <Text style={styles.contentText}>
                  {number(item.installment_amount).format('0,0.00')}
                </Text>
              </View>
            </>
          ) : (
            <>
              <View>
                <Text>Masa Pinjaman</Text>
                <Text style={styles.contentText}>
                  {moment(item.startdate).format('DD-MMM-YYYY')} {' s/d '}
                  {moment(item.duedate).format('DD-MMM-YYYY')}
                </Text>
              </View>
              <View>
                <Text>Bunga </Text>
                <Text style={styles.contentText}>
                  {number(item.interest_rate_year).format('0,0.00')} %
                </Text>
              </View>
              <View>
                <Text>Bunga OD</Text>
                <Text style={styles.contentText}>
                  {number(item.bunga_tarifthn).format('0,0.00')} %
                </Text>
              </View>
            </>
          )}
        </Card>
      </View>
    );

    if (this.state.loading) {
      return (
        <View style={{flex: 1}}>
          <Loading loading={this.state.loading} />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={Styles_.topbarflat}>
          <ButtonFun
            type="BackBtn"
            name="Back"
            onPress={() => navigation.navigate('debitur_detail')}
          />
          <Text style={Styles_.topbartext}>Pinjaman Aktif</Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <FlatList
            data={this.state.pinjaman}
            renderItem={renderItem}
            keyExtractor={(item) => item.pinjamankey}
          />
        </View>
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
  dispatch,
  route,
  props,
  debitur,
}) {
  const navigation = useNavigation();
  return (
    <PinjamanAktif
      {...props}
      navigation={navigation}
      params={route.params}
      useRoute={route}
      dispatch={dispatch}
      debitur={debitur}
    />
  );
});
