import React from 'react';
import {View} from 'react-native';
import {Picker} from '@react-native-community/picker';

export default function Dropdown({
  selectedValue,
  onValueChange,
  options,
  placeholder,
}) {
  return (
    <View style={{borderWidth: 0.7, borderBottomColor: 'black'}}>
      <Picker selectedValue={selectedValue} onValueChange={onValueChange}>
        {placeholder ? (
          <Picker.Item label={placeholder} key={-1} disabled={true} />
        ) : (
          <></>
        )}

        {options.map((item, index) => {
          return (
            <Picker.Item label={item.label} value={item.value} key={index} />
          );
        })}
      </Picker>
    </View>
  );
}
