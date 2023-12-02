import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TextInput,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';
import number from 'numeral';
import {useNavigation,useRoute} from '@react-navigation/native';
// components
import {SearchText, Loading, BottomTabNav} from '../components/atoms';
// apis
import pelunasan from '../../apis/pelunasan';
import { rounded, colors } from '../utils';
import Styles_ from '../utils/styles';


const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

class Pelunasan extends Component {
  state = {
    loading: true,
    selectedId: null,
    list: [],
    searchtext: '',
    page: 1,
    limit: 10,
    total: 0,
    selectedObj: {},
    refreshing: false,
  };
  componentDidMount = () => {
    try {
      this.getData();
    } catch (error) {
      alert(error);
    }
  };
  // methods
  onSearching = async (text) => {
    const this_ = this;
    const listPelunasan = [];
    setTimeout(async function () {
      this_.setState({searchtext: text, list: []});
      this_.getData();
    }, 2000);
  };
  onClickClose = () => {
    const this_ = this;
    setTimeout(async function () {
      this_.setState({searchtext: null, list: []});
      this_.getData();
    }, 2000);
  };
  getData = async () => {
    const listPelunasan = this.state.list;
    const {list, total} = await pelunasan.list(this.state);
    list.map((x) => {
      listPelunasan.push(x);
    });
    if (this.state.refreshing) {
      this.setState({refreshing: false});
    }
    this.setState({list: listPelunasan, loading: false, total});
  };
  onRefresh = () => {
    this.setState({list: [], page: 1, refreshing: true});
    const this_ = this;
    setTimeout(function () {
      this_.getData();
    }, 1000);
    // wait(2000).then(() => this_.setState({refreshing: false}));
  };
  render() {
    // Get it from props
    const {navigation,useRoute} = this.props;
    const Item = ({item, style}) => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('pelunasan_detail', {
            pelunasankey: item.pelunasankey,
          });
        }}
        style={[styles.item, style]}>
        <Card style={{padding: 15, borderRadius:20}}>
          <View>
            <Text>Name </Text>
            <Text style={styles.contentText}>
              {item.CustName ? item.CustName.trim() : '-'}
            </Text>
          </View>
          <View>
            <Text>Tgl Pelunasan</Text>
            <Text style={styles.contentText}>
              {item.tglpelunasan
                ? moment(item.tglpelunasan).format('DD MMM YYYY')
                : '-'}
            </Text>
          </View>
          <View>
            <Text>Total Installment</Text>
            <Text style={styles.contentAmount}>
              {number(item.ttlinstalment || 0).format('0,0.00')}
            </Text>
          </View>
          <View>
            <Text>Total Denda</Text>
            <Text style={styles.contentAmount}>
              {number(item.ttllatecharge || 0).format('0,0.00')}
            </Text>
          </View>
          {/* <View>
            <Text>Total Diskon</Text>
            <Text style={styles.contentAmount}>
              {number(item.diskon_percent || 0).format('0,0.00')}
            </Text>
          </View> */}
          <View>
            <Text>Diskon</Text>
            <Text style={styles.contentAmount}>
              {number(item.diskon_amount || 0).format('0,0.00')}
            </Text>
          </View>
          <View>
            <Text>Total Pembayaran</Text>
            <Text style={styles.contentAmount}>
              {number(item.ttlpayment || 0).format('0,0.00')}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
    const renderItem = ({item}) => {
      //   const backgroundColor =
      //     item.id === this.state.selectedId ? '#fff' : '#fff';
      return <Item item={item} style={{padding: 2}} />;
    };
    return (
      <ImageBackground
        source={require('../images/Component/background.png')}
        style={Styles_.containerflex}>
        <View>
          <View style={{height: '100%'}}>
            <View style={Styles_.topbar}>
              <Text style={styles.text}>
                    List Pelunasan
              </Text>
              <View style={{marginTop:-6}} />
            <SearchText
              placeholder={'Cari data pelunasan'}
              onChangeText={this.onSearching}
              onClickClose={this.onClickClose}
            />
            </View>
            <SafeAreaView>
              <FlatList
                data={this.state.list}
                renderItem={renderItem}
                keyExtractor={(item) => item.nasabahkey}
                extraData={this.state.selectedId}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                  />
                }
              />
            </SafeAreaView>
            <Loading loading={this.state.loading} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();
  const route = useRoute();
  return <Pelunasan {...props} navigation={navigation} useRoute={route}/>;
}

const styles = StyleSheet.create({
  item: {
    padding: 4,
    alignItems: 'center',
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  contentText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  contentAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  title: {
    fontSize: 32,
  },
  text: {
    marginTop: '2%',
    fontSize: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Rajdhani',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 31,
    textAlign: 'center',
    color: colors.default,
  }
});
