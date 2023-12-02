import React,{Component} from 'react';
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

import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';

import ButtonFun from '../components/atoms/Button';
import Styles_ from '../utils/styles';

class EmergencyContact extends Component {
  render(){
    const {navigation} = this.props;

    return (
      <SafeAreaView style={Styles_.containerflex}>
        <View style={Styles_.topbarflat}>
          <ButtonFun
            type="BackBtn"
            name="Back"
            onPress={() => navigation.navigate('debitur_detail')}
          />
          <Text style={Styles_.topbartext}>Emergency Contact</Text>
        </View>
      </SafeAreaView>
    )
  }
}


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
    <EmergencyContact
      {...props}
      navigation={navigation}
      params={route.params}
      useRoute={route}
      dispatch={dispatch}
      debitur={debitur}
    />
  );
});