import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  DatePickerIOS,
  KeyboardAvoidingView,
} from 'react-native';
import PropTypes from 'prop-types';

export default class addAssignment extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
    modalClose: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);

    this.state = {
      dueDate: new Date(),
      assignmentName: ''
    };
  }

  setDate = async newDate => {
    await this.setState({dueDate: newDate});
  }

  render(){
    return(
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.props.isVisible}
      >
        <View style={styles.dim}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{marginTop: 'auto'}}
          >
            <View
              style={styles.container}>
            >
              <View style={styles.closeTop}>
                <TouchableOpacity onPress={() => {
                  this.setState({
                    dueDate: new Date(),
                    assignmentName: ''
                  });
                  this.props.modalClose(false);
                }}>
                  <Image
                    style={styles.closeIcon}
                    source={require('../resources/close.png')}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  if(this.props.editClassInfo){
                    this.props.editClassInfo(this.props.index, 'assignments', this.state);
                  } else if(this.props.addAssignment){
                    this.props.addAssignment(this.state);
                  }
                  this.setState({
                    dueDate: new Date(),
                    assignmentName: ''
                  });
                  this.props.modalClose(false);
                }}>
                  <Text
                    style={styles.saveText}
                  >
                    Save
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.createAssignment}>
                <TextInput
                  style={styles.assignmentsName}
                  placeholder='Assignment Name'
                  value={this.state.assignmentName}
                  onChangeText={(assignmentName) => this.setState({assignmentName})}
                />
                <DatePickerIOS
                  mode={'date'}
                  date={this.state.dueDate}
                  onDateChange={this.setDate}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  dim: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    flex: 1,
    alignItems: 'stretch'
  },

  container: {
    height: 300,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    marginTop: 'auto',
    paddingBottom: 0
  },

  closeTop: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  saveText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4a98f7'
  },

  closeIcon: {
    width: 20,
    height: 20
  },

  createAssignment: {
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: 1,
  },

  assignmentsName: {
    marginHorizontal: 15,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '600',
  }
});
