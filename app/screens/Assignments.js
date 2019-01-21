import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  AsyncStorage,
} from 'react-native';
import TopBar from '../components/TopBar';
import DeleteClass from '../components/DeleteClass';
import SwipeableClass from '../components/SwipeableClass';
import PriorityBox from '../components/PriorityBox';
import CompleteAssignment from '../components/CompleteAssignment';

export default class Onboard extends Component {
  static navigationOptions = {
    title: 'Assignments',
    tabBarIcon: ({focused, tintColor}) => <Image
      source={require('../resources/assignmentsIcon.png')}
      style={{height: 20, width: 20, tintColor: tintColor}}
    />
  };

  constructor(props){
    super(props);

    this.state = {
      numObjects: 8.
    }
  }

  assignmentRightAction = (close, classIndex, assignmentIndex) =>
    <DeleteClass
      deleteAssignment={this.props.screenProps.deleteAssignment}
      close={close}
      classIndex={classIndex}
      assignmentIndex={assignmentIndex}
    />

  assignmentLeftAction = (close, classIndex, assignmentIndex) =>
    <CompleteAssignment
      deleteAssignment={this.props.screenProps.deleteAssignment}
      close={close}
      classIndex={classIndex}
      assignmentIndex={assignmentIndex}
    />

  getAssignments = () => {
    var assignments = new Array()
    for (let _class of this.props.screenProps.classes) {
      for (let assignment of _class.assignments) {
        assignments.push({
          assignment: assignment,
          classIndex: this.props.screenProps.classes.indexOf(_class),
          assignmentIndex: _class.assignments.indexOf(assignment)
        });
      }
    }
    return assignments.sort((a, b) => Date.parse(a.assignment.dueDate) - Date.parse(b.assignment.dueDate));
  }

  loadClasses = () => {
    this.setState({
      numObjects: this.state.numObjects * 2
    })
  }

  render(){
    const assignmentData = this.getAssignments();

    return(
      <View style={styles.container}>
        <TopBar title='Assignments'/>
        <View style={{flex: 1}}>
          <FlatList
            data = { assignmentData }
            onEndReached = {this.loadClasses}
            keyExtractor = {(item, index) => index.toString()}
            initialNumtoRender = {8}
            renderItem = {({item}) =>
              <SwipeableClass
                assignmentRightAction={this.assignmentRightAction}
                assignmentLeftAction={this.assignmentLeftAction}
                classIndex={item.classIndex}
                assignmentIndex={item.assignmentIndex}
              >
                <PriorityBox
                  assignmentName={item.assignment.assignmentName}
                  dueDate={item.assignment.dueDate}
                />
              </SwipeableClass>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: "stretch",
    backgroundColor: "#eeefef",
    flex: 1
  }
})
