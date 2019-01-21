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
import AddAssignment from './AddAssignment'
import AssignmentBox from './AssignmentBox';

export default class ClassEdit extends Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    isVisible: PropTypes.bool.isRequired,
    className: PropTypes.string.isRequired,
    teacherName: PropTypes.string.isRequired
  }

  constructor(props){
    super(props);

    this.state = {
      isVisible: false,
    }

  }

  modalVisible = visible => {
    this.setState({isVisible: visible});
  }

  render() {
    const assignmentData = this.props.assignments;
    return(
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={this.props.isVisible}
      >
        <View style={styles.container}>
          <View style={styles.closeTop}>
            <TouchableOpacity onPress={() => {
              this.props.modalClose(false);
            }}>
              <Image
                style={styles.closeIcon}
                source={require('../resources/close.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.classInfo}>
            <TouchableOpacity onPress={ async() => {
              let image = await this.props.getImageAsync();
              if(image){
                this.props.editClassInfo(this.props.index, 'image', image);
              }
            }}>
              <Image
                source={{uri: this.props.image}}
                style={styles.classImage}
              />
            </TouchableOpacity>
            <TextInput
              style={styles.className}
              placeholder='Class Name'
              value={this.props.className}
              onChangeText = {(className) => {this.props.editClassInfo(this.props.index, 'className', className)}}
            />
            <TextInput
              style={styles.teacherName}
              placeholder='Teacher Name'
              value={this.props.teacherName}
              onChangeText = {(teacherName) => {this.props.editClassInfo(this.props.index, 'teacherName', teacherName)}}
            />
          </View>
          <View style={styles.assignments}>
            <AddAssignment
              modalClose={this.modalVisible}
              isVisible={this.state.isVisible}
              editClassInfo={this.props.editClassInfo}
              index={this.props.index}
            />
            <View style={styles.assignmentHeaderBox}>
              <Text style={styles.assignmentHeader}>
                ASSIGNMENTS
              </Text>
              <TouchableOpacity onPress={() => {this.modalVisible(true);}}>
                <Image
                  style={styles.addAssignment}
                  source={require('../resources/addAssignment.png')}/>
              </TouchableOpacity>
            </View>
            <FlatList
              style={{marginTop: 25}}
              data={ assignmentData }
              keyExtractor = {(item, index) => index.toString()}
              initialNumtoRender = {2}
              renderItem = {({item}) =>
                <AssignmentBox
                  assignmentName={item.assignmentName}
                  dueDate={item.dueDate}
                />
              }
            />
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
  }

});
