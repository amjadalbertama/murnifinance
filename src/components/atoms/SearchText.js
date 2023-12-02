import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { colors } from '../../utils';
import IconSearch from '../../assets/icon/search.svg';
import Icon from 'react-native-ionicons';


const SearchText = ({ placeholder ,onChangeText,onClickClose,textSearchInput}) => {

    return (
        <View style={styles.container}>
            <View style={styles.inlineBox}>
               <IconSearch width={30} height={25} fill={colors.default} marginTop={7} marginLeft={5} onPre/>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder || 'Cari disini ...'}
                    placeholderTextColor={colors.default} 
                    onChangeText={onChangeText}
                />
                {/* masih ada PR untuk clear text */}
                {/* <Icon name={'close-circle-outline'} style={styles.iconclose} size={20} onPress={onClickClose}/> */}
            </View>
            
        </View>
    );
};

export default SearchText;

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    inlineBox:{
        borderWidth: 3,
        borderColor: colors.default,
        borderRadius: 20,
        flexDirection: 'row', flexWrap: 'wrap',  
        height: 45
    },
    // icon:{
    //     marginVertical:7,
    //     marginHorizontal:5,
    // },
    iconclose:{
        position:'absolute',
        right:5,
        top:16,
        justifyContent: 'center',
    },
    input: {
        fontSize: 16,
        color: 'black',
        marginVertical: -7

    }
});
