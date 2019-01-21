import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';

export default class PriorityBox extends Component {

  constructor(props){
    super(props);
  }

  formatDate = (dueDate) => {
    let newDate = new Date(dueDate.getTime());
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return newDate.toLocaleDateString("en-US", options);
  }

  renderDateInfo = () => {
    var today = new Date();
    var text;
    var diff = Math.abs(this.props.dueDate.getTime() - today.getTime());
    diff = diff / 1000;
    var source = require('../resources/clockRed.png');
    if(diff < 45){
      text = ( 'in' + ' ' + Math.round(diff) + ' ' + 'seconds' );
    } else if(diff >= 45 && diff <= 89) {
      text = ('in a minute');
    } else {
      diff = diff/60;
      if(diff >= 1.5 && diff < 45){
        text = ('in' + ' ' + Math.round(diff) + ' ' + 'minutes');
      } else if(diff >= 45 && diff <= 89){
        text = ('in an hour');
      } else {
        diff = diff/60;
        if(diff >= 1.5 && diff < 22){
          text = ('in' + ' ' + Math.round(diff) + ' ' + 'hours');
        } else if(diff >= 22 && diff <= 35){
          text =('in a day');
        } else {
          diff = diff/24;
          source = require('../resources/clockYellow.png')
          if(diff >= 1.5 && diff < 26){
            text = ('in' + ' ' + Math.round(diff) + ' ' + 'days');
          } else {
            source = require('../resources/clockBlue.png')
            if(diff >= 26 && diff < 45){
              text = ('in a month');
            } else if(diff >= 45 && diff < 320){
              text = ('in' + ' ' + Math.round(diff/30) + ' ' + 'months');
            } else if(diff >= 320 & diff < 548){
              text = ('in a year');
            } else {
              text = ('in' + ' ' + Math.round(diff/365) + ' ' + 'years');
            }
          }
        }
      }
    }
    return ({text: text, source: source});
  }

  render(){
    return(
      <View style={styles.container}>
        <Image
          source={this.renderDateInfo().source}
          style={styles.assignmentImage}
        />
        <View style={styles.assignmentInfo}>
          <Text style={styles.assignmentName}>
            <Text style={[styles.bold]}>
              {this.props.assignmentName}
            </Text>
            {' '}
            is due {this.renderDateInfo().text} on
            {' '}
            <Text style={styles.bold}>
              {this.formatDate(this.props.dueDate)}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderWidth: 0.25,
    borderColor: '#e2e2e2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },

  assignmentImage: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },

  assignmentInfo: {
    marginLeft: 20,
    flexDirection: 'row',
  },

  assignmentName: {
    fontSize: 16,
    letterSpacing: -0.3,
    marginRight: 20
  },

  bold: {
    fontWeight: 'bold',
  }
});
