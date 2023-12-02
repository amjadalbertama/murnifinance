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
  ImageBackground,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import {setDebitur} from '../actions';

import {Card} from 'react-native-shadow-cards';
import {IconBtn} from '../components/Icon';
import {useNavigation} from '@react-navigation/native';

// components
import {SearchText, Loading, BottomTabNav} from '../components/atoms';

// apis
import debitur from '../../apis/debitur';
import {rounded, colors} from '../utils';
import Styles_ from '../utils/styles';

class Debitur extends Component {
  state = {
    loading: true,
    selectedId: null,
    list: [],
    searchtext: '',
    page: 1,
    limit: 15,
    total: 0,
  };
  componentDidMount = () => {
    const result = debitur.list(this.state);
    const this_ = this;
    result.then(
      (value) => {
        this_.setState({list: value, loading: false});
      },
      (reason) => {
        alert(reason);
        this_.setState({loading: false});
      },
    );
  };
  // methods
  onSearching = async (text) => {
    const this_ = this;
    setTimeout(async function () {
      this_.setState({searchtext: text});
      const result = await debitur.list(this_.state);
      this_.setState({list: result});
    }, 2000);
  };

  render() {
    // Get it from props
    const {navigation, useRoute, dispatch} = this.props;
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
            <Text>Name </Text>
            <Text style={styles.contentText}> {item.CustName.trim()}</Text>
          </View>
          <View>
            <Text>Phone No</Text>
            <Text style={styles.contentText}>
              {item.PhoneNo ? item.PhoneNo : '-'}
            </Text>
          </View>
          <View>
            <Text>Address</Text>
            <Text style={styles.contentText}>
              {item.Address1 ? item.Address1 : '-'}
            </Text>
            <Text style={styles.contentText}>
              {item.Address2 ? item.Address2 : ''}
            </Text>
          </View>
          <View>
            <Text>City</Text>
            <Text style={styles.contentText}>
              {item.City ? item.City : '-'}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
    const renderItem = ({item}) => {
      // console.log('item',item);
      //   const backgroundColor =
      //     item.id === this.state.selectedId ? '#fff' : '#fff';

      return <Item item={item} style={{padding: 2}} />;
    };
    return (
      <ImageBackground
        source={require('../images/Component/background.png')}
        style={Styles_.containerflex}>
        <View style={{marginBottom: 10}}>
          <View style={{height: '100%'}}>
            <View style={Styles_.topbar}>
              <Text style={styles.text}>List Debitur</Text>
              <View style={{marginTop: -6}} />
              <SearchText
                placeholder={'Cari data debitur'}
                onChangeText={this.onSearching}
                onClickClose={this.onClickClose}
              />
            </View>
            <SafeAreaView style={{height: dimHeight - 170}}>
              <FlatList
                data={this.state.list}
                renderItem={renderItem}
                keyExtractor={(item) => item.nasabahkey}
                extraData={this.state.selectedId}
              />
            </SafeAreaView>
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
    <Debitur
      {...props}
      navigation={navigation}
      useRoute={route}
      dispatch={dispatch}
    />
  );
});

const styles = StyleSheet.create({
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
