import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import AssignmentBox from './AssignmentBox';
import AddAssignment from './AddAssignment';

export default class ClassEdit extends Component {
  static propTypes = {
    isVisible: PropTypes.bool.isRequired,
  }

  constructor(props){
    super(props);

    this.state = {
      className: '',
      teacherName: '',
      image: 'http://via.placeholder.com/150x150',
      assignments: [],
      isVisible: false
    }
  }

  modalVisible = visible => {
    this.setState({isVisible: visible});
  }

  addAssignment = (assignment) => {
    newAssignments = this.state.assignments.slice();
    newAssignments.push(assignment);
    this.setState({assignments: newAssignments});
  }

  render() {
    const assignmentData = this.state.assignments;

    return(
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.isVisible}
      >
        <View style={styles.container}>
          <View style={styles.closeTop}>
            <TouchableOpacity onPress={() => {
              this.setState({
                className: '',
                teacherName: '',
                image: 'http://via.placeholder.com/150x150',
                assignments: []
              })
              this.props.modalClose(false);
            }}>
              <Image
                style={styles.closeIcon}
                source={require('../resources/close.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.classInfo}>
            <TouchableOpacity onPress={async() => {
              let image = await this.props.getImageAsync();
              if(image){
                this.setState({image: image});
              }
            }}>
              <Image
                source={{uri: this.state.image}}
                style={styles.classImage}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.className}
              placeholder='Class Name'
              value={this.state.className}
              onChangeText = {(className) => this.setState({className})}
            />
            <TextInput
              style={styles.teacherName}
              placeholder='Teacher Name'
              value={this.props.teacherName}
              onChangeText = {(teacherName) => this.setState({teacherName})}
            />
          </View>
          <View style={styles.assignments}>
            <AddAssignment
              modalClose={this.modalVisible}
              isVisible={this.state.isVisible}
              addAssignment={this.addAssignment}
            />
            <View style={styles.assignmentHeaderBox}>
              <Text style={styles.assignmentHeader}>
                ASSIGNMENTS
              </Text>
              <TouchableOpacity
                onPress={() => this.modalVisible(true)}
              >
                <Image
                  style={styles.addAssignment}
                  source={require('../resources/addAssignment.png')}/>
              </TouchableOpacity>
            </View>
            }<FlatList
              style={{marginTop: 25}}
              data={ assignmentData }
              keyExtractor = {(item, index) => index.toString()}
              initialNumtoRender = {0}
              renderItem = {({item}) =>
                <AssignmentBox
                  assignmentName={item.assignmentName}
                  dueDate={item.dueDate}
                />
              }
            />
          </View>
          <View style={styles.saveSection}>
            <TouchableOpacity
              onPress={() => {
                this.props.addClass(
                this.state.className, this.state.teacherName, this.state.image, this.state.assignments
                );
                this.setState({
                  className: '',
                  teacherName: '',
                  image: 'http://via.placeholder.com/150x150',
                  assignments: []
                })
                this.props.modalClose(false);
              }}
              style={styles.saveButton}
            >
              <Text style={styles.saveText}>
                SAVE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    flex: 1,
  },

  closeTop: {
    marginTop: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  closeIcon: {
    width: 20,
    height: 20
  },

  classInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20
  },

  classImage: {
    width: 150,
    height: 150,
    borderRadius: 75
  },

  className: {
    color: "#484b4f",
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 30,
    marginTop: 20,
  },

  teacherName: {
    textAlign: 'center',
    color: "#b2b2b2",
    marginTop: 15,
    fontWeight: '600',
    fontSize: 20,
  },

  assignments: {
    marginTop: 30,
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  assignmentHeaderBox: {
    paddingLeft: 40,
    paddingRight: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  assignmentHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: "#484b4f",
  },

  addAssignment: {
    width: 20,
    height: 20
  },

  saveSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  saveButton: {
    padding: 25,
    backgroundColor: '#4a98f7',
    flex: 1
  },

  saveText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700'
  }

});
