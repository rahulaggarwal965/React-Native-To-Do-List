import React, { Component } from 'react';

import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class SwipeableClass extends Component {

  renderRightActions = progress => {

    if(this.props.classRightAction){
      return (
        this.props.classRightAction(this.close, this.props.index)
      );
    }
    if(this.props.assignmentRightAction){
      return (
        this.props.assignmentRightAction(this.close, this.props.classIndex, this.props.assignmentIndex)
      );
    }
  };

  renderLeftActions = progress => {

    if(this.props.assignmentLeftAction){
      return(
        this.props.assignmentLeftAction(this.close, this.props.classIndex, this.props.assignmentIndex)
      );
    }
  };

  updateRef = ref => {
    this._swipeableRow = ref;
  }

  close = () => {
    this._swipeableRow.close();
  }

  render(){
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={40}
        rightThreshold={40}
        renderRightActions={this.renderRightActions}
        renderLeftActions={this.renderLeftActions}
      >
        {children}
      </Swipeable>
    );
  }
}
