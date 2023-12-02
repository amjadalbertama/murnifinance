import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import ButtonIconBack from '../../../assets/icon/icon-back.svg';
import {ToachableOpacity} from 'react-native-gesture-handler';
import {colors} from '../../../utils/colors'


const IconBack = ({...rest}) => {
    
        return (
            <ToachableOpacity {...rest}>
            
                {rest.name === 'back' &&  <ButtonIconBack width={35} height={30} fill={colors.default}/>}

            </ToachableOpacity>
            
        );
    
};

export default IconBack;
