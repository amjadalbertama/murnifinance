import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';

import {colors} from '../../utils';
import {useAuth} from '../../hooks/useAuth';

import IconPinjaman from '../../assets/icon/pinjaman-active.svg';
import IconHistory from '../../assets/icon/update-activity.svg';
import IconAdd from '../../assets/icon/add-activity.svg';
import Iconsimulasi from '../../assets/icon/simulasi-pelunasan.svg';
import IconEmergancy from '../../assets/icon/telepon-emergency.svg';
// let styles_ = ;
function ButtonDetailNav({navigation, routeName, debitur}) {
  console.log('routeName', routeName);
  // const navigation = props.navigation;
  // const routeName = props.routeName;
  const {auth, state} = useAuth();
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 67,
          backgroundColor: colors.lis,
          width: useWindowDimensions().width,
          // borderTopLeftRadius: 15,
          // borderTopRightRadius: 15,
          borderTopWidth: 0.5,
          paddingHorizontal: 15,
          paddingTop: 20,
        }}>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('pinjaman_aktif')}>
            <View style={styles.tabMenu}>
              <IconPinjaman
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={
                  routeName == 'pinjaman_aktif' ? colors.active : colors.default
                }
              />
              <Text style={styles.titleIcon}>Pinjaman</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('collector_activity_history')}>
            <View style={styles.tabMenu}>
              <IconHistory
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={
                  routeName == 'collector_activity_history'
                    ? colors.active
                    : colors.default
                }
              />
              <Text style={styles.titleIcon}>History Activity</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('collector_activity_update', {
                nasabahkey: debitur.nasabahkey,
              });
            }}>
            <View style={styles.tabMenu}>
              <IconAdd
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={
                  routeName == 'collector_activity_update'
                    ? colors.active
                    : colors.default
                }
              />
              <Text style={styles.titleIcon}>Add Activity</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('simulasi_pelunasan')}>
            <View style={styles.tabMenu}>
              <Iconsimulasi
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={
                  routeName == 'simulasi_pelunasan'
                    ? colors.active
                    : colors.default
                }
              />
              <Text style={styles.titleIcon}>Simulasi Pelunasan</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('emergency_contact')}>
            <View style={styles.tabMenu}>
              <IconEmergancy
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={
                  routeName == 'emergency_contact'
                    ? colors.active
                    : colors.default
                }
              />
              <Text style={styles.titleIcon}>Emergancy Contact</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  bottomTab: {
    // flex:1,
    // flexDirection: 'row',
    // height: 67,
    // backgroundColor: '#FFFFFF',
    // width: useWindowDimensions().width,
    // borderTopLeftRadius: 25,
    // borderTopRightRadius: 25,
  },
  colTab: {
    width: '20%',
  },
  tabMenu: {
    alignContent: 'center',
    alignItems: 'center',
  },
  titleIcon: {
    marginTop: 15,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 10,
    lineHeight: 14,
    textAlign: 'center',
    color: '#000000',
  },
  icon: {
    width: 32,
    height: 32,
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

export default connect(mapStateToProps)(ButtonDetailNav);
