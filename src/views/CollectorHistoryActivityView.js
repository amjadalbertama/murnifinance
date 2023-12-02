import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  StatusBar,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {Card} from 'react-native-shadow-cards';
import moment from 'moment';

import {Loading} from '../components/Loading';
import ButtonFun from '../components/atoms/Button';
import Styles_ from '../utils/styles';

import debiturapi from '../../apis/debitur';

class CollectorHistoryActivity extends Component {
  state = {
    history: undefined,
    loading: true,
  };
  componentDidMount = () => {
    const {debitur} = this.props;
    const this_ = this;
    const api = debiturapi.historyActivity(debitur.nasabahkey);
    api.then(
      (value) => {
        this_.setState({history: value, loading: false});
      },
      (reason) => {
        this_.setState({loading: false});
        console.log('reason', reason);
      },
    );
  };
  render() {
    let dimensions = Dimensions.get('window');
    let imageHeight = Math.round((dimensions.width * 9) / 16);
    let imageWidth = dimensions.width;
    const {navigation} = this.props;

    const renderItem = ({item}) => (
      <View>
        <Card style={{width: '100%', marginTop: 5, padding: 5}}>
          <Image
            style={{
              height: imageHeight,
              width: imageWidth,
              resizeMode: 'center',
            }}
            source={{
              uri: item.photo,
            }}
          />
          <View>
            <Text>Activity </Text>
            <Text style={styles.contentText}>
              {item.activity_update || '-'}
            </Text>
          </View>
          <View>
            <Text>Update Date </Text>
            <Text style={styles.contentText}>
              {moment(item.modified).format('DD-MMM-YYYY')}
            </Text>
          </View>
          <View>
            <Text>Update By </Text>
            <Text style={styles.contentText}>{item.createby}</Text>
          </View>
        </Card>
      </View>
    );
    if (this.state.loading) {
      return (
        <ImageBackground
          source={require('../images/Component/background.png')}
          style={{flex: 1}}>
          <Loading loading={this.state.loading} />
        </ImageBackground>
      );
    }
    return (
      <SafeAreaView style={Styles_.containerflex}>
        <View style={Styles_.topbarflat}>
          <ButtonFun
            type="BackBtn"
            name="Back"
            onPress={() => navigation.navigate('debitur_detail')}
          />
          <Text style={Styles_.topbartext}>History Activity</Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <FlatList
            data={this.state.history}
            renderItem={renderItem}
            keyExtractor={(item) => item.collactivitykey}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
    <CollectorHistoryActivity
      {...props}
      navigation={navigation}
      params={route.params}
      useRoute={route}
      dispatch={dispatch}
      debitur={debitur}
    />
  );
});
