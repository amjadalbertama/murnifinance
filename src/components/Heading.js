import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

export function Heading({children, style, ...props}) {
  return (
    <View>
      <Text {...props} style={[style, styles.text]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
    color: 'black',
  },
});
