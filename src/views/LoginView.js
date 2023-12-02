import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  useWindowDimensions,
  Dimensions
} from 'react-native';

import {Heading} from '../components/Heading';
import {Error} from '../components/Error';
import {IconBtn} from '../components/Icon';
import {AuthContainer} from '../components/AuthContainer';
import {Loading} from '../components/Loading';
import {Button} from '../components';
import Icon from 'react-native-ionicons';
import IconUser from '../assets/icon/User.svg';
import IconPass from '../assets/icon/password.svg';

import {AuthContext} from '../contexts/AuthContext';
import {colors, rounded} from '../utils';

export function Login({navigation}) {
  const {login} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('ekok');
  const [password, setPassword] = React.useState('ENTER2kali');
  const [loading, setLoading] = React.useState(false);
  
  return (
    <>
      <View style={styles.com_main}>
        <View style={styles.com_top}>
          <Text style={styles.welcometextfirst}>
            Selamat datang di Murni Finance
          </Text>
          <Text style={styles.welcometextsecond}>Silakan Login</Text>
          <Image source={require('../images/logo.png')} style={styles.logo} />
        </View>
        <View style={styles.com_middle} />
        <View style={styles.com_bottom} />
        <View style={styles.position_form}>
          <View style={styles.com_auth}>
            <View style={styles.login_form}>
              <AuthContainer>
                <Error error={''} />
                <View style={styles.space(25)} />
                <View style={styles.inlineBox}>
                  <IconUser
                    width={25}
                    height={25}
                    marginTop={5}
                    marginLeft={5}
                    fill={colors.default}
                  />
                  <View style={styles.position_input}>
                      <TextInput
                        style={styles.input}
                        placeholder={'Username'}
                        keyboardType={'email-address'}
                        value={email}
                        onChangeText={setEmail}
                      />
                  </View>

                </View>
                  

                <View style={styles.space(50)} />
                <View style={styles.inlineBox}>
                  <IconPass
                    width={25}
                    height={25}
                    marginTop={5}
                    marginLeft={5}
                    fill={colors.default}
                  />
                  <View style={styles.position_input}>
                    <TextInput
                      style={styles.input}
                      placeholder={'Password'}
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                    />
                  </View>  
                </View>
                <View style={styles.space(70)} />
                <Text style={styles.verifyuserpass}>
                  Pastikan Username dan Password Sesuai
                </Text>
                <Button
                  title="Login"
                  onPress={async () => {
                    try {
                      setLoading(true);
                      await login(email, password);
                      navigation.navigate('Home');
                      setLoading(false);
                    } catch (error) {
                      console.log('error ==>', error);
                      setLoading(false);
                    }
                  }}
                />
              </AuthContainer>
            </View>
          </View>
        </View>
      </View>
      <Loading loading={loading} text={'Login ...'} />
    </>
  );
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  com_main: {
    flex: 1,
    backgroundColor: colors.default,
  },
  com_top: {
    height: 0.50 * height,
    backgroundColor: colors.com,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomRightRadius: rounded.extra,
  },
  com_middle: {
    backgroundColor: colors.com,
    flex: 1,
  },
  com_bottom: {
    backgroundColor: colors.default,
    marginTop: -0.50 * height,
    height: 0.48 * height,
    borderTopLeftRadius: rounded.extra,
    alignItems: 'center',
    justifyContent: 'center',
  },
  com_auth: {
    
    marginTop: -0.80 * height,
    width: 0.90 * width,
    height: 0.50 * height,
    backgroundColor: colors.background,
    borderRadius: rounded.large,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,
    elevation: 20,
  },
  position_form: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_form: {
    marginTop: '-30%',
  },
  inlineBox: {
    width: 0.80 * width,
    borderWidth: 3,
    borderColor: colors.default,
    borderRadius: rounded.hug,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 44,
  },

  position_input: {
    justifyContent: 'center',
    textAlign: 'center',
    flex: 1
    
  },

  input: {
    
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'Roboto',
    color: colors.default,
    marginLeft: -0.10 * width,
  },

  welcometextfirst: {
    position: 'absolute',
    width: 291,
    height: 21,
    top: '10%',
    fontFamily: 'Red Hat Text',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    /* identical to box height */
    color: colors.default,
    textAlign: 'center',
  },

  welcometextsecond: {
    position: 'absolute',
    width: 263,
    height: 21,
    top: '15%',
    fontFamily: 'Red Hat Text',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 21,
    /* identical to box height */
    color: colors.default,
    textAlign: 'center',
  },
  logo: {
    resizeMode: 'contain',
    width: 170,
    height: 128,
    position: 'absolute',
    top: 110,
  },
  space: (value) => {
    return {
      height: value,
    };
  },
  verifyuserpass: {
    width: 260,
    height: 14,
    top: '80%',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    lineHeight: 14,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
    color: colors.text.login,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginVertical: 20,

    // design-edit
    position: 'absolute',
    width: 265,
    height: 44,
    top: '82%',
    backgroundColor: '#408EC6',
    borderRadius: 20,
  },
  buttonforget: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
  },
});

export default Login;
