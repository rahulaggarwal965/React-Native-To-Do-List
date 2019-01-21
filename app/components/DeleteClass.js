import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';

export default class DeleteClass extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <View style={{width: 100, flexDirection: 'row'}}>
        <RectButton
          style={styles.rightAction}
          onPress={() => {
            this.props.close();
            if(this.props.deleteClass){
              this.props.deleteClass(this.props.index);
            }
            if(this.props.deleteAssignment){
              this.props.deleteAssignment(this.props.classIndex, this.props.assignmentIndex);
            }
          }}
        >
          <Image
            source={require('../resources/closeWhite.png')}
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
    backgroundColor: '#dd2c00',
  },

  closeIcon: {
    height: 20,
    width: 20,
  }
})
