import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default class AssignmentBox extends Component {
  static propTypes = {
    assignmentName: PropTypes.string.isRequired,
  }

  formatDate = (dueDate) => {
    let newDate = new Date(dueDate.getTime());
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString("en-US", options);
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.assignmentName}>
          {this.props.assignmentName}
        </Text>
        <Text style={styles.dueDate}>
          {this.formatDate(this.props.dueDate)}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.25,
    borderColor: '#e2e2e2'
  },

  assignmentName: {
    color: '#484b4f',
    fontWeight: '600',
    fontSize: 12,
  },

  dueDate: {
    color: '#484b4f',
    fontWeight: '600',
    fontSize: 12,
  }
});
