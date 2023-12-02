import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

import moment from 'moment';
import number from 'numeral';

export function CollectorActivity({items}) {
  return items.map((item) => {
    return (
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 0.5,
          paddingHorizontal: 10,
        }}
        key={item.collactivitykey}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <View style={{width: '40%', height: 30}}>
            <Text style={{textAlign: 'right'}}>Tgl Update</Text>
          </View>
          <View style={{width: '60%', height: 30}}>
            <Text style={{textAlign: 'left', marginLeft: 10}}>
              : {moment(item.modified).format('DD MMM YYYY HH:mm')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <View style={{width: '40%', height: 30}}>
            <Text style={{textAlign: 'right'}}>Update Activity</Text>
          </View>
          <View style={{width: '60%', height: 30}}>
            <Text style={{textAlign: 'left', marginLeft: 10}}>
              : {item.activity_update}
            </Text>
          </View>
        </View>
      </View>
    );
  });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default CollectorActivity;
