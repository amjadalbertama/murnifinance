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

export function PinjamanDebitur({items}) {
  return items.map((item) => {
    return (
      <View
        style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 0.5,
          paddingHorizontal: 10,
        }}
        key={item.pinjamankey}>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <View style={{width: '40%', height: 30}}>
            <Text style={{textAlign: 'right'}}>No Kontrak</Text>
          </View>
          <View style={{width: '60%', height: 30}}>
            <Text style={{textAlign: 'left', marginLeft: 10}}>
              : {item.no_kontrak}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <View style={{width: '40%', height: 30}}>
            <Text style={{textAlign: 'right'}}>Tgl. Kontrak</Text>
          </View>
          <View style={{width: '60%', height: 30}}>
            <Text style={{textAlign: 'left', marginLeft: 10}}>
              : {moment(item.tgl_kontrak).format('DD MMM YYYY')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <View style={{width: '40%', height: 30}}>
            <Text style={{textAlign: 'right'}}>Sisa Pokok</Text>
          </View>
          <View style={{width: '60%', height: 30}}>
            <Text style={{textAlign: 'right'}}>
              {number(item.principal_outstand).format('0,0.00')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <View style={{width: '40%', height: 30}}>
            <Text style={{textAlign: 'right'}}>Sisa Bunga</Text>
          </View>
          <View style={{width: '60%', height: 30}}>
            <Text style={{textAlign: 'right'}}>
              {number(item.interest_outstand).format('0,0.00')}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            padding: 5,
          }}>
          <View style={{width: '40%', height: 30}}>
            <Text style={{textAlign: 'right'}}>Total Denda</Text>
          </View>
          <View style={{width: '60%', height: 30}}>
            <Text style={{textAlign: 'right'}}>
              {number(item.latecharge_amount).format('0,0.00')}
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

export default PinjamanDebitur;
