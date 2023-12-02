import React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import Icon from 'react-native-ionicons';

export function IconBtn({name, style, size, color}) {
  return (
    <TouchableHighlight>
      <Icon name={name} size={size} color={color} />
      {/* <Icon ios="ios-add" android="md-add" /> */}
      {/* <Text></Text> */}
    </TouchableHighlight>
  );
}
