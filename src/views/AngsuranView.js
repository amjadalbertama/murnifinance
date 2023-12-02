import React, {Component, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import { setDebitur } from '../actions'

import {Card} from 'react-native-shadow-cards';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import number from 'numeral';
import {rounded, colors} from '../utils';
import Styles_ from '../utils/styles';

// components
import {SearchText, Loading, LoadMore} from '../components/atoms';
// apis
import angsuran from '../../apis/angsuran';

class Angsuran extends Component {
  state = {
    loading: true,
    loadmore: false,
    selectedId: null,
    list: [],
    searchtext: '',
    page: 1,
    limit: 10,
    total: 0,
    refreshing: false,
    hasMore: true,
  };
  componentWillUnmount = () => {
    // console.log('componentWillUnmount');
  };
  componentDidMount = () => {
    try {
      this.getAngsuran();
    } catch (error) {
      alert(error);
    }
  };
  shouldComponentUpdate = () => {
    // console.log('shouldComponentUpdate');
    return true;
  };
  // methods
  onSearching = async (text) => {
    const this_ = this;
    setTimeout(async function () {
      this_.setState({searchtext: text});
      const result = await angsuran.list(this_.state);
      this_.setState({list: result});
    }, 2000);
  };
  onClickClose = () => {
    const this_ = this;
    setTimeout(async function () {
      this_.setState({searchtext: null, list: []});
      this_.getData();
    }, 2000);
  };
  getAngsuran = async () => {
    const listAngsuran = this.state.list;
    const {list, total} = await angsuran.list(this.state);
    list.map((x) => {
      listAngsuran.push(x);
    });
    this.setState({list: listAngsuran, loading: false, loadmore: false, total});
  };
  isCloseToBottom({layoutMeasurement, contentOffset, contentSize}) {
    return (
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 50
    );
  }
  loadMoreDt = () => {
    if (this.state.list.length < this.state.total) {
      const nextpage = this.state.page + 1;
      const this_ = this;
      this_.setState({page: nextpage, loadmore: true});
      setTimeout(function () {
        this_.getAngsuran();
      }, 500);
    }
  };
  render() {
    // Get it from props
    const {navigation, useRoute,dispatch} = this.props;
    const dimHeight = Dimensions.get('window').height;
    const clickdetail = (item) => {
      dispatch(setDebitur(item));
      navigation.navigate('debitur_detail', {
        nasabahkey: item.nasabahkey,
      });
    };
    const Item = ({item, style}) => (
      <TouchableOpacity
        onPress={() => {
          clickdetail(item);
        }}
        style={[styles.item, style]}>
        <Card style={{padding: 15}}>
          <View>
            <Text>Nama Debitur </Text>
            <Text style={styles.contentText}>
              {item.CustName ? item.CustName.trim() : '-'}
            </Text>
          </View>
          <View>
            <Text>No Kontrak </Text>
            <Text style={styles.contentText}>{item.no_kontrak.trim()}</Text>
          </View>
          <View>
            <Text>Angsuran Ke </Text>
            <Text style={styles.contentText}>{item.angsuran_ke}</Text>
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
              borderTopColor: '#d3d3d3',
              borderTopWidth: 2,
              marginTop: 5,
              paddingTop: 5,
            }}>
            <Text>Total</Text>
            <View style={styles.Amount}>
              <Text style={styles.content}>
                {number(item.akum_denda + item.angsuran).format('0,0.00')}
              </Text>
            </View >
          </View>
        </Card>
      </TouchableOpacity>
    );

    const renderItem = ({item}) => {
      //   const backgroundColor =
      //     item.id === this.state.selectedId ? '#fff' : '#fff';

      return (
        <Item
          item={item}
          onPress={() => this.setState({selectedId: item.id})}
          style={{padding: 2}}
        />
      );
    };
    return (
      <ImageBackground
        source={require('../images/Component/background.png')}
        style={Styles_.containerflex}>
        <View>
          <View style={{height: '100%'}}>
            <View style={Styles_.topbar}>
              <Text style={styles.text}>List Jatuh Tempo</Text>
              <View style={{marginTop: -6}} />
              <SearchText
                placeholder={'Cari data angsuran'}
                onChangeText={this.onSearching}
                onClickClose={this.onClickClose}
              />
            </View>
            <SafeAreaView style={{height: dimHeight - 170}}>
              <FlatList
                data={this.state.list}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.angsurankey}
                extraData={this.state.selectedId}
                onScroll={({nativeEvent}) => {
                  if (this.isCloseToBottom(nativeEvent) && this.state.hasMore) {
                    this.loadMoreDt();
                  }
                }}
              />
            </SafeAreaView>
            <LoadMore loadmore={this.state.loadmore} />
            <Loading loading={this.state.loading} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default connect()(function ({dispatch, route, props}) {
  const navigation = useNavigation();
  return (
    <Angsuran
      {...props}
      navigation={navigation}
      params={route.params}
      useRoute={route}
      dispatch={dispatch}
    />
  );
});

const styles = StyleSheet.create({
  content: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color:colors.background
  },
  item: {
    padding: 4,
    alignItems: 'center',
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  contentText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  contentAmount: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'right',
    // color:colors.background
  },
  Amount:{
    width: '100%',
    height: 25,
    backgroundColor: colors.default,
    borderRadius: 4,
    // paddingRight: 5
    
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
  },
});
