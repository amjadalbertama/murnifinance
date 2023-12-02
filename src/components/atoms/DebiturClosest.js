import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MapSVG from '../../assets/icon/maps.svg';
import { rounded, colors } from '../../utils';
function DebiturClosest(item) {
  return (
    <View style={styles.container}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View
          style={{width: '80%', height: 50}}
        >
            <Text>Nama Debitur : Dadang Eka Antariksa</Text>
            <Text>No. Kontrak : 00654.0015.13.03.RJK</Text>
        </View>
        <View style={{width: '20%', height: 40, padding: 10}}>
          <MapSVG width={35} height={35} marginVertical={-10} 
          fill={colors.default}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 0.7,
    borderBottomColor: '#000000',
    marginVertical: 5,
  },
});
export default DebiturClosest;
