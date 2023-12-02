// import React from 'react';
// import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import {useNavigation} from '@react-navigation/native';
// import Geolocation from '@react-native-community/geolocation';

// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-ionicons';

// import {IconBtn} from '../components/Icon';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     display: 'flex',
//     flexDirection: 'column',
//     backgroundColor: 'black',
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   topButtons: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     alignItems: 'flex-start',
//   },
//   bottomButtons: {
//     flex: 1,
//     width: Dimensions.get('window').width,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },

//   flipButton: {
//     flex: 1,
//     marginTop: 20,
//     right: 20,
//     alignSelf: 'flex-end',
//   },
//   recordingButton: {
//     marginBottom: 10,
//   },
// });

// class PhotoCamera extends React.PureComponent {
//   state = {
//     type: RNCamera.Constants.Type.back,
//     latitude: 0,
//     longitude: 0,
//     altitude: 0,
//   };

//   componentDidMount = () => {
//     const this_ = this;
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const {coords} = position;
//         this_.setState({
//           latitude: coords.latitude,
//           longitude: coords.longitude,
//           altitude: coords.altitude,
//         });
//       },
//       (error) => alert(error.message),
//     );
//   };
//   flipCamera = () =>
//     this.setState({
//       type:
//         this.state.type === RNCamera.Constants.Type.back
//           ? RNCamera.Constants.Type.front
//           : RNCamera.Constants.Type.back,
//     });

//   takePhoto = async () => {
//     const {navigation, params} = this.props;
//     const base64 = false;
   
//     const writeExif = {
//       GPSLatitude: this.state.latitude,
//       GPSLongitude: this.state.longitude,
//       GPSAltitude: this.state.altitude,
//     };
//     const options = {
//       quality: 0.5,
//       base64,
//       width: 300,
//       height: 300,
//       writeExif,
//       exif: true,
//     };
//     console.log('!options',options);
//     const data = await this.camera.takePictureAsync(options);
//     console.log('data',data);
//     navigation.navigate('collector_activity_update', {
//       nasabahkey: params.nasabahkey,
//       image: data.base64 || data.uri,
//       base64,
//       GPSLatitude: this.state.latitude,
//       GPSLongitude: this.state.longitude,
//       GPSAltitude: this.state.altitude,
//     });
//   };
//   render() {
//     const {type} = this.state;
//     return (
//       <View style={styles.container}>
//         <RNCamera
//           ref={(cam) => {
//             this.camera = cam;
//           }}
//           type={type}
//           style={styles.preview}
//         />
//         <View style={styles.topButtons}>
//           <TouchableOpacity onPress={this.flipCamera} style={styles.flipButton}>
//             <IconBtn name={'refresh'} size={35} color="orange" />
//           </TouchableOpacity>
//         </View>
//         <View style={styles.bottomButtons}>
//           <TouchableOpacity
//             onPress={this.takePhoto}
//             style={styles.recordingButton}>
//             <Icon name={'camera'} size={50} color="orange" />
//             {/* <IconBtn name={'camera'} size={50} color="orange"/> */}
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }
// }

// export default function ({route, props}) {
//   const navigation = useNavigation();
//   return (
//     <PhotoCamera {...props} navigation={navigation} params={route.params} />
//   );
// }
