import React from 'react';
import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
const Loading = ({loading})=>{
  if (!loading) {
    return <View />;
  }
  return (
    <View style={styles.overlay}>
      <View>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text style={styles.text}>Loading...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
});


export default Loading;
