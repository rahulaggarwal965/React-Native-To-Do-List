import React, { Component } from 'react';
import { createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import {
  AsyncStorage,
} from 'react-native';
import { Permissions, ImagePicker} from 'expo';

//screens
import {
  Classes,
  Assignments,
  OnboardScreen,
} from './screens';


const MainNavigator = createBottomTabNavigator({
  Classes: { screen: Classes},
  Assignments: {screen: Assignments}
});

class MainContent extends Component {
  static router = MainNavigator.router;

  constructor(props){
    super(props);

    this.state = {
      classes: []
    }
  }

  getClasses = async () => {
    try {
      let value = JSON.parse(await AsyncStorage.getItem('classes'));
      if(value){
        for (let _class of value){
          for (let assignment of _class.assignments){
            assignment.dueDate = new Date(assignment.dueDate);
          }
        }
        this.setState({classes: value});
      }
    } catch (error) {
      console.log('error' + error);
      alert('Error Retrieving Classes');
    }
  }

  setClasses = () => {
    AsyncStorage.setItem('classes', JSON.stringify(this.state.classes));
  }

  getImageAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if( status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
      });

      if(!result.cancelled) {
        return result.uri;
      } else {
        return false
      }
    } else {
      throw new Error('Camera Roll access not granted');
    }
  }

  editClassInfo = async (index, infoType, value) => {
    let newClass = this.state.classes.slice();
    switch (infoType) {
      case 'className':
        newClass[index].className = value;
        break;
      case 'teacherName':
        newClass[index].teacherName = value;
        break;
      case 'image':
        if (typeof value === 'string'){
          newClass[index].image = value;
          break;
        } else {
          break;
        }
      case 'assignments':
        newClass[index].assignments = newClass[index].assignments.concat({assignmentName: value.assignmentName, dueDate: value.dueDate});
        break;
    }
    await this.setState({classes: newClass});
    this.setClasses();
  }

  addClass = async (className, teacherName, image, assignments) => {
    let newClass = this.state.classes.concat(
      {className: className, teacherName: teacherName, image: image, assignments: assignments}
    );
    await this.setState({classes: newClass});
    this.setClasses();
  }

  deleteClass = async (index) => {
    let newClass = [...this.state.classes.slice(0, index), ...this.state.classes.slice(index+1)]
    await this.setState({classes: newClass});
    this.setClasses();
  }

  deleteAssignment = async (classIndex, assignmentIndex) => {
    let newClass = this.state.classes.slice();
    newClass[classIndex].assignments = [...newClass[classIndex].assignments.slice(0, assignmentIndex), ...newClass[classIndex].assignments.slice(assignmentIndex+1)];
    await this.setState({classes: newClass});
    this.setClasses();
  }

  componentDidMount() {
    this.getClasses();
  }

  render(){
    return(
      <MainNavigator
        navigation={this.props.navigation}
        screenProps={{
          classes: this.state.classes,
          getClasses: this.getClasses,
          setClasses: this.setClasses,
          getImageAsync: this.getImageAsync,
          editClassInfo: this.editClassInfo,
          addClass: this.addClass,
          deleteClass: this.deleteClass,
          deleteAssignment: this.deleteAssignment,
        }}
        />
    );
  }
}

export const Root = createSwitchNavigator({
  OnboardScreen: {screen: OnboardScreen},
  Main: {screen: MainContent}
}, {
  headerMode: 'none',
  initialRouteName: 'OnboardScreen',
});
