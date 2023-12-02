import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {colors} from '../../utils';
import IconHome from '../../assets/icon/home.svg';
import IconPelunasan from '../../assets/icon/pelunasan.svg';
import IconJtempo from '../../assets/icon/jatuh-tempo.svg';
import IconDebitor from '../../assets/icon/debitor.svg';
import IconAkun from '../../assets/icon/akun.svg';
// bottom menu for detail debitur
import ButtonDetailNav from './ButtonDetailNav';
// let styles_ = ;
function BottomTabNav(props, type, name) {
  const navigation = props.navigation;
  const routeName = props.routeName;
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          height: 67,
          backgroundColor: '#FFFFFF',
          width: useWindowDimensions().width,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          paddingHorizontal: 15,
          paddingTop: 20,
        }}>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback onPress={() => navigation.navigate('Home')}>
            <View style={styles.tabMenu}>
              <IconHome
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={routeName == 'Home' ? colors.active : colors.default}
              />
              <Text style={styles.titleIcon}>Home</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Pelunasan')}>
            <View style={styles.tabMenu}>
              <IconPelunasan
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={routeName == 'Pelunasan' ? colors.active : colors.default}
              />
              <Text style={styles.titleIcon}>Pelunasan</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Angsuran')}>
            <View style={styles.tabMenu}>
              <IconJtempo
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={routeName == 'Angsuran' ? colors.active : colors.default}
              />
              <Text style={styles.titleIcon}>Jatuh Tempo</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Debitur')}>
            <View style={styles.tabMenu}>
              <IconDebitor
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={routeName == 'Debitur' ? colors.active : colors.default}
              />
              <Text style={styles.titleIcon}>Debitur</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.colTab}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Profile')}>
            <View style={styles.tabMenu}>
              <IconAkun
                width={styles.icon.width}
                height={styles.icon.height}
                marginVertical={-12}
                fill={routeName == 'Profile' ? colors.active : colors.default}
              />
              <Text style={styles.titleIcon}>Akun</Text>
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

export default function (props) {
  let routeNm = '';
  const route = useRoute();
  const {state} = route;
  if (state) {
    routeNm = state.routes[state.index].name;
  }
  const navigation = useNavigation();
  if (
    routeNm == 'debitur_detail' ||
    routeNm == 'collector_activity_update' ||
    routeNm == 'collector_activity_history' ||
    routeNm == 'pinjaman_aktif' ||
    routeNm == 'simulasi_pelunasan' ||
    routeNm == 'emergency_contact'
  ) {
    return (
      <ButtonDetailNav {...props} navigation={navigation} routeName={routeNm} />
    );
  }
  if (
    routeNm == 'EditProfile'){
      return(<></>)
    }
  return (
    <BottomTabNav {...props} navigation={navigation} routeName={routeNm} />
  );
}
