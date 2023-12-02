import React, {Component, useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  ScrollView,
  useWindowDimensions,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useRoute } from '@react-navigation/native';

import {IconBtn} from '../components/Icon';
import {BottomTabNav, Card, DebiturClosest} from '../components/atoms';
import Geolocation from '@react-native-community/geolocation';
import News from '../datas/news';
import DebtClosestDt from '../datas/debiturclosest';
import {color, colors, rounded} from '../utils';

export function Home({img}) {
  const width = useWindowDimensions().width - 10;
  const height = width * 0.6;
  const route = useRoute();

  const [active, setActive] = useState(0);
  const images = News;
  const change = ({nativeEvent}) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slide !== active) {
      setActive(slide);
    }
  };
  const click = ({nativeEvent}) => {
    // console.log('#nativeEvent', nativeEvent);
  };
  return (
    <ImageBackground
      // source={require('../images/Component/background.png')}
      style={styles.container}
      >
      
        {/* <View
          style={{
            marginTop: -50,
            height: height + 50,
            width: width,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 20,
            marginHorizontal: 10,
            shadowOpacity: 2,
            shadowRadius: 2,              
            elevation: 5,
          }}>
          <ScrollView
            pagingEnabled
            horizontal
            onScroll={change}
            showHorizontalScrollIndicator={false}
            style={{width, height: height + 50, borderRadius: 20}}>
            {images.map((image, index) => (
              <View key={index} style={{width, height: height + 50}}>
                <ImageBackground
                  key={index}
                  source={{uri: image.url}}
                  style={{width, height, borderRadius: 20, resizeMode: 'cover'}}
                  imageStyle={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                  onClick={click}
                />
                {image.isTrading == true ? (
                  <View
                    style={{
                      position: 'absolute', // child
                      bottom: 33,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 10,
                      height: 34,
                      backgroundColor: '#CB2A2A',
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: 'bold',
                        fontSize: 18,
                        lineHeight: 20,
                        color: '#FFFFFF',
                        width: '100%',
                      }}>
                      Tranding News
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                <View
                  style={{
                    position: 'absolute', // child
                    bottom: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 10,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Roboto',
                      fontStyle: 'normal',
                      fontWeight: 'normal',
                      fontSize: 14,
                      lineHeight: 16,
                      color: '#000000',
                      width: '100%',
                    }}>
                    Berita terbaru ke-{index + 1}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View> */}
        {/* <View style={styles.pagination}>
          {images.map((i, k) => (
            <Text key={k} style={k == active ? styles.activeDot : styles.dot}>
              •
            </Text>
          ))}
        </View> */}
        {/* <View style={styles.thinLine} /> */}
        {/* <Text style={{fontSize: 15, marginTop: 20, marginBottom: 10}}>
          Debitur Near Me
        </Text> */}

        <View style={styles.com_main}>
          <View style={styles.topbar}/>
            <View style={styles.pos_topmain}>
              <View  style={styles.topmain}>
                <Text style={styles.text_topmain}>
                  list beritaku
                </Text>
              </View>
            </View>
         

            <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.com_scroll}>
{/*  news 1 */}
            <View style={styles.com_news}>
              <View style={styles.position_image}>
                  <Image source={require('../images/Component/dummy1.jpg')}
                  style={{width: '100%', height: 160,
                  borderTopLeftRadius: rounded.medium,
                  borderTopRightRadius: rounded.medium,
                  }}>
                  </Image>
              </View>
                  <View
                    style={styles.label}>
                    <Text
                      style={styles.text_label}>
                      Tranding News
                    </Text>
                  </View>
              <Text>
                tess
              </Text>
          </View>

{/*  news 2 */}
          <View style={styles.com_news}>
             <View style={styles.position_image}>
                <Image source={require('../images/Component/dummy2.jpg')}
               style={{width: '100%', height: 160,
               borderTopLeftRadius: rounded.medium,
               borderTopRightRadius: rounded.medium,
               }}>
                </Image>
            </View>
                  <View
                    style={styles.label}>
                    <Text
                      style={styles.text_label}>
                      Tranding News
                    </Text>
                  </View>
             
            <Text>
              tess
            </Text>
            
          </View>

{/* news 3  */}
          <View style={styles.com_news}>
            <View style={styles.position_image}>
                <Image source={require('../images/Component/dummy3.png')}
               style={{width: '100%', height: 160,
               borderTopLeftRadius: rounded.medium,
               borderTopRightRadius: rounded.medium,
                }}>
                </Image>
            </View>
                  <View
                    style={styles.label}>
                    <Text
                      style={styles.text_label}>
                      Tranding News
                    </Text>
                  </View>

             
            <Text>
              tess
            </Text>

          </View>

        </ScrollView>
        </View>

        <View style={styles.position_bluebox}>

        
        <View style={styles.bluebox}>
          <Card headerTitle={'List Debitur Terdekat'}>
            <FlatList
              data={DebtClosestDt}
              renderItem={DebiturClosest}
              keyExtractor={(item, index) => index.toString()}
            />
          </Card>
        </View>
        </View>
       
      
    </ImageBackground>
  );
}

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height:200
    backgroundColor: colors.default
  },

  com_main: {
    height: 0.50 * height,
    },
  com_scroll: {
  marginHorizontal: 0, 
  marginTop: 20,
  height: 200
  },

  topbar: {
    height: 20, 
    backgroundColor: colors.background,
    borderBottomLeftRadius: rounded.small,
    borderBottomRightRadius: rounded.small,
  },
  pos_topmain: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  topmain: {
     justifyContent: 'center',
     alignItems: 'center',
     padding: 10,
     height: 30,
     backgroundColor: colors.background,
     borderRadius: rounded.medium,
     width: '35%',
     marginTop: -18,
  },
  text_topmain: {
    color: colors.default,
    fontSize: 18,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: 'bold',
    },

  com_news: {
    backgroundColor: colors.background,
    height: 240,
    width: 300,
    borderRadius: rounded.medium,
    // padding: 5,
    marginHorizontal: 15,
    // borderWidth: 1,
    // borderColor: colors.background,
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,
    elevation: 20,
  },

  position_image: {
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: '1.8%'
 },
 label: {
  // position: 'absolute', // child
  // bottom: 33,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 10,
  height: 34,
  backgroundColor: '#CB2A2A',
  borderTopRightRadius: 20,
  borderBottomRightRadius: 20,
  width: '50%',
  marginTop: -15

},
text_label: {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: 18,
  lineHeight: 20,
  color: '#FFFFFF',
  width: '100%',
},

  firstRow: {
    marginTop: 40,
    height: '40%',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
  },

  position_bluebox: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:- 0.07 * height,
  },
  bluebox: {
    // width: '94.9%',
    height: 0.60 * height,
    width: 0.90 * width,
    
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 10.0,
    elevation: 20,
  },

  pagination: {
    flexDirection: 'row',
    height: 30,
    alignSelf: 'center',
    alignItems: 'center',
  },
  dot: {
    color: '#888',
    fontSize: 30,
  },
  activeDot: {
    color: '#FFF',
    fontSize: 30,
  },
  bottomLeft: {
    position: 'absolute',
    bottom: 8,
    left: 16,
  },
  dep: {
    
  }
});

export default Home;
