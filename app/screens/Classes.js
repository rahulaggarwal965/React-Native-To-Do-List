import React, { Component } from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import ClassBox from '../components/ClassBox';
import DeleteClass from '../components/DeleteClass'
import AddClass from '../components/AddClass';
import TopBar from '../components/TopBar';
import SwipeableClass from '../components/SwipeableClass';

export default class Classes extends Component {
  static navigationOptions = {
    title: 'Classes',
    tabBarIcon: ({focused, tintColor}) => <Image
      source={require('../resources/classesIcon.png')}
      style={{height: 20, width: 16.56, tintColor: tintColor}}
    />
  };

  constructor(props) {
    super(props);

    this.state = {
      numObjects: 8.,
      isVisible: false
    };
  }

  modalVisible = visible => {
    this.setState({isVisible: visible});
  }

  classRightAction = (close, index) =>
    <DeleteClass
      deleteClass={this.props.screenProps.deleteClass}
      close={close}
      index={index}
    />

  loadClasses = () => {
    this.setState({
        numObjects: this.state.numObjects * 2
    })
  }

  render(){
    const classData = this.props.screenProps.classes;
    return (
      <View style={styles.container}>
        <TopBar title='Classes'/>
        <View style={styles.classHeader}>
          <Text style={styles.currentClasses}> CURRENT CLASSES </Text>
          <AddClass
            addClass={this.props.screenProps.addClass}
            getImageAsync={this.props.screenProps.getImageAsync}
            isVisible={this.state.isVisible}
            modalClose={this.modalVisible}
          />
          <TouchableOpacity onPress={() => {this.modalVisible(true)}}>
            <Image
              style = {styles.addClass}
              source={require('../resources/addClass.png')}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data = { classData }
          onEndReached = {this.loadClasses}
          keyExtractor = {(item, index) => index.toString()}
          initialNumtoRender = {10}
          renderItem = {({item}) =>
            <SwipeableClass
              classRightAction={this.classRightAction}
              index={this.props.screenProps.classes.indexOf(item)}
            >
              <ClassBox
                getImageAsync={this.props.screenProps.getImageAsync}
                image={item.image}
                index={this.props.screenProps.classes.indexOf(item)}
                editClassInfo ={this.props.screenProps.editClassInfo}
                assignments={item.assignments}
                className={item.className}
                teacherName={item.teacherName}
              />
            </SwipeableClass>
          }
        />
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
  },

  classHeader: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 18,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  currentClasses: {
    letterSpacing: -0.2,
    color: '#484b4f',
    fontWeight: '600',
    fontSize: 12
  },

  addClass: {
    width: 30,
    height: 30
  },
});
