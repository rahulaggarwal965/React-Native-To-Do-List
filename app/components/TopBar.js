import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

export default class TopBar extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    return(
      <View style={styles.mainBar}>
        <Text style={styles.title}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 0,
    height: 80,
    backgroundColor: '#4a98f7',
    shadowRadius: 5,
    shadowOffset:  {width: 0, height: 2},
    shadowOpacity: 0.25,
    padding: 15
  },

  title: {
    color: '#ffffff',
    fontSize: 20,
    alignSelf: 'flex-end',
    fontWeight: '600'
  }
});
