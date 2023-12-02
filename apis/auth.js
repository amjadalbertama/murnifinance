import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import {
  VUE_APP_BASE_API,
  VUE_APP_AUTH_TK,
  VUE_APP_AUTH_RFSHTK,
  VUE_APP_AUTH_ME,
} from '../envs/local.json';

const storeData = async (name, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(`@${name}`, jsonValue);
  } catch (e) {
    // saving error
  }
};

export default {
  validate(user) {
    return new Promise(async (resolve, reject) => {
      try {
        user.originApp = 'mobileaps';
        const {data} = await axios.post('auth/signin', user);
        axios.defaults.headers.Authorization = data.token;
        await AsyncStorage.setItem(VUE_APP_AUTH_TK, data.token);
        await AsyncStorage.setItem(VUE_APP_AUTH_RFSHTK, data.refresh_token);
        const res = await axios.get(`${VUE_APP_BASE_API}/users/me`);
        storeData('sessionuser', res.data);
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  current() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await AsyncStorage.getItem(VUE_APP_AUTH_TK);
        axios.defaults.headers.Authorization = token || null;
        const {data: user} = await axios.get('users/me');
        const jsonValue = JSON.stringify(user);
        await AsyncStorage.setItem('@storage_Key', jsonValue);
        resolve(user);
      } catch (error) {
        reject(error);
      }
    });
  },
};
