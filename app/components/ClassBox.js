import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import ClassEdit from './ClassEdit';
import { RectButton } from 'react-native-gesture-handler';

function hashCode(className) {
  let hash = 0;
  for (var i = 0; i < className.length; i++) {
     hash = className.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(classNameHash){
    let c = (classNameHash & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

export default class ClassBox extends Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    teacherName: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }

  modalVisible = (visible) => {
    this.setState({isVisible: visible});
  }

  render(){
    return(
      <View>
        <ClassEdit
          image={this.props.image}
          getImageAsync={this.props.getImageAsync}
          index={this.props.index}
          assignments={this.props.assignments}
          editClassInfo={this.props.editClassInfo}
          isVisible={this.state.isVisible}
          modalClose={this.modalVisible}
          className={this.props.className}
          teacherName={this.props.teacherName}
        />
        <RectButton
          onPress={() => {this.modalVisible(true)}}
        >
          <View style={styles.container}>
            <Image
              source={{uri: this.props.image}}
              style={styles.classImage}
            />
            <View style={styles.classInfo}>
              <Text style={styles.className}>
                {this.props.className}
              </Text>
              <Text style={styles.teacherName}>
                {this.props.teacherName}
              </Text>
            </View>
          </View>
        </RectButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.25,
    borderColor: '#e2e2e2'
  },

  classInfo: {
    height: 38,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 20,
  },

  teacherName: {
    color: '#b2b2b2',
    fontWeight: '600',
    fontSize: 12,
  },

  className: {
    color: '#484b4f',
    fontWeight: '600',
    fontSize: 16,
  },

  classImage: {
    height: 30,
    width: 30,
    borderRadius: 15
  }
});
