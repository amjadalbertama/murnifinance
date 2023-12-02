/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {Heading} from '../components/Heading';
import {Error} from '../components/Error';
import {AuthContext} from '../contexts/AuthContext';

export function Registration({navigation}) {
  const {register} = React.useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    // <AuthContainer>
    <View
      style={{
        flex: 1,
        padding: 23,
        marginTop: 100,
        alignItems: 'center',
      }}>
      {/* <Text>Some more text</Text> */}
      <Image
        source={{
          uri: 'http://startup.ekossystem.com/img/logo-ebs.png',
        }}
        style={{
          resizeMode: 'contain',
          width: 200,
          height: 100,
        }}
      />
      <Error error={''} />
      <Heading>Register</Heading>
      {/* <IconBtn name={'close-circle-outline'} /> */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'transparent',
          borderBottomColor: 'gray',
          borderWidth: 1,
          marginVertical: 10,
          width: '90%',
        }}
        placeholder={'Email'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.password}
        placeholder={'Password'}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableHighlight
        style={styles.button}
        // onPress={() => navigation.navigate('Home')}
        onPress={() => {
          register(email,password);
        }}>
        <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
          Register
        </Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.buttonlogin}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={{color: 'black', fontSize: 18, fontWeight: '500'}}>
          Login
        </Text>
      </TouchableHighlight>
    </View>
    // </AuthContainer>
  );
}

const styles = StyleSheet.create({
  password: {
    marginVertical: 8,
    height: 40,
    borderColor: 'transparent',
    borderBottomColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    width: '90%',
  },
  button: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  buttonlogin: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    // marginVertical:20
  },
});

export default Registration;
