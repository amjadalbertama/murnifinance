import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{props.headerTitle}</Text>
      </View>
      <View>
        <View style={styles.body}>{props.children}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    // shadowColor: 'rgba(0, 0, 0, 0.5)',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // elevation: 5,
    // minHeight: 70,
  },
  header: {
    height: 30,
    padding: 20,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 12,
    // },
    // shadowOpacity: 0.58,
    // shadowRadius: 16.00,
    // minHeight: 70,
  },
  headerTitle: {
    fontFamily: 'Rajdhani',
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 18,
    color: '#1B6BA5',
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 17,
  },
});

export default Card;
