import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

export default class CompleteClass extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return(
      <View style={{width: 100, flexDirection: 'row'}}>
        <RectButton
          style={styles.rightAction}
          onPress={() => {
            this.props.close();
            if(this.props.deleteAssignment){
              this.props.deleteAssignment(this.props.classIndex, this.props.assignmentIndex);
            }
          }}
        >
          <Image
            source={require('../resources/completeWhite.png')}
            style={styles.closeIcon}
          />
        </RectButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rightAction: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1ed11e',
  },

  closeIcon: {
    height: 20,
    width: 28.385,
  }
})
