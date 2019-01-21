import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Dimensions
} from 'react-native';
import Swiper from '../components/Swiper';

const {width, height} = Dimensions.get('window');

export default class OnboardScreen extends Component {

  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      firstLaunch: null,
    }
  }

  navigateToMain = () => {
    this.props.navigation.navigate('Main');
  }

  async componentDidMount(){
    //Debug
    // try{
    //   await AsyncStorage.clear();
    // } catch (error) {
    //   console.log('failed');
    // }
    //debug

    try {
      let value = await AsyncStorage.getItem('alreadyLaunched');

      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        this.setState({firstLaunch: 'true'});
      }
      else{
        this.setState({firstLaunch: 'false'});
        this.props.navigation.navigate('Main');
      }
    } catch (error) {
      console.log('error' + error);
      this.setState({firstLaunch: 'false'});
      this.props.navigation.navigate('Main');
    }
  }

  render(){
    const { navigate } = this.props.navigation;
    if(this.state.firstLaunch == null){
      return null;
    } else if(this.state.firstLaunch === 'true'){
      return (
        <Swiper
        exit={this.navigateToMain}
        buttons={true}
        pagination={true}
        width={width}
        height={height}
        >
          <View style={[styles.slide, { backgroundColor: '#4a98f7' }]}>
            <Text style={styles.header}>HELLO.</Text>
            <Text style={styles.text}>This is an app that organizes your classes.</Text>
          </View>
          <View style={[styles.slide, { backgroundColor: '#C04DEE' }]}>
            <Text style={styles.header}>EASY AND ACCESSIBLE</Text>
            <Text style={styles.text}>The functionality is intuitive.</Text>
          </View>
          <View style={[styles.slide, { backgroundColor: '#FC515B' }]}>
            <Text style={styles.header}>LETS GO</Text>
            <Text style={styles.text}>Press the button below to get started.</Text>
          </View>
        </Swiper>
      );
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 40,
    textAlign: 'center',
  },

  header: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15,
  }
})
