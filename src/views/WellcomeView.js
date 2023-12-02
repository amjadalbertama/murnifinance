import React, {Component} from 'react';
import { Text, View, Image, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: colors.sheet
    },
    logo: {
        resizeMode: 'contain',
        width: 170,
        height: 128,
    },
    welcometext: {
        // width: 291,
        // height: 50,
        fontFamily: 'GoogleSans-Blod',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: 36,
        marginTop: 50,
        // lineHeight: 21,
        /* identical to box height */
        color: '#1969BB',
        // textAlign: 'center',
        // paddingTop:18
    },
});

class Wellcome extends Component {

    state ={
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
        loadingSpinner: false,
    }

    componentDidMount(){
        const{LogoAnime, LogoText}= this.state;
        Animated.parallel([Animated.spring(LogoAnime, {
            toValue: 1,
            tension: 10,
            friction: 2,
            // duration: 10000,
            useNativeDriver: false,
        }).start(),

        Animated.timing(LogoText, {
            toValue: 1, 
            // duration: 12000,
            useNativeDriver: false,
            }),

        ]).start(() =>{
            this.setState({
                LoadingSpinner: true,
            });
        });
    }

    render() {   
        return (
            <View style={styles.container}>
                <Animated.View
                style={{
                    opacity: this.state.LogoAnime,
                    top: this.state.LogoAnime.interpolate({
                        inputRange: [0, 1],
                        outputRange: [80, 0],
                    }),
                }}>
                <Image
                    source={require('../images/logo.png')}
                    // style={styles.logo}
                />
                </Animated.View>
                <Animated.View style={{opacity: this.state.LogoText}}>
                    <Text style={styles.welcometext}>Murni Finance</Text>
                </Animated.View>
                
            </View>
        );
    }
}

export default function (props) {
    const navigation = useNavigation();
    return <Wellcome {...props} navigation={navigation} />;
}
