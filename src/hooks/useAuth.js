import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  VUE_APP_BASE_API,
  VUE_APP_AUTH_TK,
  VUE_APP_AUTH_RFSHTK,
  VUE_APP_AUTH_ME,
} from '../../envs/local.json';

import axios from 'axios';
axios.defaults.baseURL = VUE_APP_BASE_API;
axios.defaults.headers['Content-type'] = 'application/json';
// import SecureStorage from 'react-native-secure-storage';

// import {BASE_URL} from '../config';
import {createAction} from '../utils/createAction';
// import {sleep} from '../utils/sleep';

// collection API
import AuthApi from '../../apis/auth';
import DebiturApi from '../../apis/debitur';

export function useAuth() {
  const [state, dispatch] = React.useReducer(
    (state, action) => {
      switch (action.type) {
        case 'SET_USER':
          return {
            ...state,
            user: {...action.payload},
            validateUsr: true,
          };
        case 'DEL_USER':
          return {
            ...state,
            user: undefined,
            validateUsr: true,
          };
        case 'SET_VALIDATEUSR':
          return {
            ...state,
            validateUsr: action.payload,
          };
        case 'SET_LOADING':
          return {
            ...state,
            loading: action.payload,
          };
        case 'SET_DEBITUR':
          return {
            ...state,
            debitur: {...action.payload},
          };
        default:
          return state;
      }
    },
    {
      user: undefined,
      debitur: undefined,
      loading: false,
      validateUsr: false,
    },
  );
  const auth = React.useMemo(() => ({
    login: (email, password) => {
      return new Promise(async (resolve, reject) => {
        try {
          const user = await AuthApi.validate({
            username: email,
            password: password,
          });
          dispatch(createAction('SET_USER', user));
          resolve(true);
        } catch (error) {
          reject(error);
          console.log('error', error);
        }
      });
    },
    logout: async () => {
      await AsyncStorage.removeItem(VUE_APP_AUTH_TK);
      await AsyncStorage.removeItem(VUE_APP_AUTH_RFSHTK);
      dispatch(createAction('DEL_USER', undefined));
    },
    refreshingToken: async () => {
      const rfshTkn = await AsyncStorage.getItem(VUE_APP_AUTH_RFSHTK);
      axios
        .post('/auth/refresh', {refresh_token: rfshTkn})
        .then(async (resp) => {
          const {data} = resp;
          if (data) {
            axios.defaults.headers.Authorization = data.token;
            await AsyncStorage.setItem(VUE_APP_AUTH_TK, data.token);
            await AsyncStorage.setItem(VUE_APP_AUTH_RFSHTK, data.refresh_token);
          }
        })
        .catch((err) => {
          auth.logout();
        });
    },
    validation: () => {
      if (!state.validateUsr) {
        console.log('start validation');
        const result = AuthApi.current();
        result.then(
          (value) => {
            console.log('success', value);
            dispatch(createAction('SET_USER', value));
            dispatch(createAction('SET_VALIDATEUSR', true));
            dispatch(createAction('SET_LOADING', false));
            return true;
          },
          (reason) => {
            if (reason.response) {
              console.log(reason.response.status);
              console.log(reason.response.data);
              console.log(reason.response.headers);
              // jika token expired
              if (reason.response.status == '403') {
                auth.refreshingToken();
              }
              if (reason.response.status) {
                dispatch(createAction('SET_VALIDATEUSR', true));
                dispatch(createAction('SET_LOADING', false));
                dispatch(createAction('DEL_USER', undefined));
                return false;
              }
            }
            dispatch(createAction('SET_VALIDATEUSR', true));
            dispatch(createAction('SET_LOADING', false));
            dispatch(createAction('DEL_USER', undefined));
            return false;
          },
        );
      }
    },
  }));
  //   React.useEffect(() => {
  //     sleep(2000).then(() => {
  //       SecureStorage.getItem('user').then(user => {
  //         if (user) {
  //           dispatch(createAction('SET_USER', JSON.parse(user)));
  //         }
  //         dispatch(createAction('SET_LOADING', false));
  //       });
  //     });
  //   }, []);
  return {auth, state};
}
