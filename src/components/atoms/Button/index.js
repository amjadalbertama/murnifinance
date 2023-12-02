import React from 'react';
import {
  Text,
  Button,
  View,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

// https://github.com/software-mansion/react-native-gesture-handler/issues/578
// ouchableOpacity is working in Android?

let TouchableHighlight, TouchableOpacity;
if (Platform.OS === 'ios') {
  ({
    TouchableHighlight,
    TouchableOpacity,
  } = require('react-native-gesture-handler'));
} else {
  ({TouchableHighlight, TouchableOpacity} = require('react-native'));
}

import {colors} from '../../../utils';
import IconBack from '../../../assets/icon/icon-back.svg';
import SettingIcon from '../../../assets/icon/setting.svg';

const ButtonFin = ({title, onPress, type, name}) => {
  if (type === 'BackBtn') {
    return (
      <TouchableOpacity
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          marginLeft: 3,
          width:50,
          position:'absolute',
          zIndex: 0,
          left:0,
        }}
        onPress={onPress}>
        <View>
          <IconBack width={35} height={30} fill={colors.default} />
        </View>
      </TouchableOpacity>
    );
  }

  if (type === 'EditBtn') {
    return (
      <TouchableOpacity
        style={{
          alignContent: 'center',
          justifyContent: 'center',
          position:'absolute',
        }}
        onPress={onPress}>
        <View>
          <SettingIcon width={32} height={32} fill={colors.default}/>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.wrapper.component} onPress={onPress}>
      <Text style={styles.text.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  wrapper: {
    component: {
      backgroundColor: colors.default,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 5,
      height: 44,
      width: 265,
    },
  },
  text: {
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      textTransform: 'uppercase',
      fontFamily: 'Red Hat Text',
      lineHeight: 31,
      marginTop: 5,
    },
  },
};

export default ButtonFin;
