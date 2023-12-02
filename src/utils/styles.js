import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {rounded} from './rounded';
const Styles_ = StyleSheet.create({
  containerflex: {
    flex: 1,
  },
  topbarflat: {
    borderBottomWidth: 0.5,
    backgroundColor: colors.lis,
    height: '8%',
    flexDirection: 'row',
    elevation: 24,
    alignContent: 'center',
    justifyContent: 'center',
  },
  topbar: {
    width: '100%',
    height: '14.8%',
    backgroundColor: colors.background,
    borderBottomWidth: 0.8,
    borderBottomColor: colors.default,
    borderBottomLeftRadius: rounded.large,
    borderBottomRightRadius: rounded.large,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  topbartext: {
    marginTop: 8,
    fontSize: 18,
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Rajdhani',
    fontStyle: 'normal',
    fontWeight: 'bold',
    lineHeight: 31,
    textAlign: 'center',
    color: colors.default,
  },
  space: (value) => {
    return{
        height: value,
    };
  },
});

export default Styles_;
