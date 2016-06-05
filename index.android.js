import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  TimePickerAndroid,
} from 'react-native';

class baked extends Component {
  render() {
    return (
      <View style={styles.outer}>
        <Image source={require('./assets/images/background.jpg')} style={styles.verticalLayout}>
            <Text style={styles.title}>I want my bread ready at</Text>
            <View style={styles.pickerContainer}>
            <TouchableWithoutFeedback
              onPress={this.showPicker.bind(this, 'baked')}>
              <View>
                <Text style={styles.picker}>00:00</Text>
              </View>
            </TouchableWithoutFeedback>
              <Text style={{width: 15}}/>
              <Text style={styles.picker}>12/06/2016</Text>
            </View>
        </Image>
      </View>
    );
  }

  async showPicker(stateKey, options) {
    try {
     const {action, minute, hour} = await TimePickerAndroid.open(options);
     var newState = {};
     if (action === TimePickerAndroid.timeSetAction) {
       newState[stateKey + 'Text'] = _formatTime(hour, minute);
       newState[stateKey + 'Hour'] = hour;
       newState[stateKey + 'Minute'] = minute;
     } else if (action === TimePickerAndroid.dismissedAction) {
       newState[stateKey + 'Text'] = 'dismissed';
     }
     this.setState(newState);
    } catch ({code, message}) {
      console.warn(`Error in example '${stateKey}': `, message);
    }
  }
}

function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

const styles = StyleSheet.create({
  outer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontStyle: 'italic',
    color: '#ffffff',
    textShadowColor: "#000000",
    textShadowRadius: 20,
    textShadowOffset: {
      height: 1,
      width: 0
    }
  },
  verticalLayout: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingTop: 150,
  },
  pickerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  picker: {
    backgroundColor: '#ffffff',
    textAlign: 'center',
    height: 20,
  },
});

AppRegistry.registerComponent('baked', () => baked);
