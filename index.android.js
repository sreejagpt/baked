import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  TimePickerAndroid,
  DatePickerAndroid,
} from 'react-native';

import Button from 'react-native-button';

class baked extends Component {

  constructor(props) {
    super(props);
    this.defaultTimeText = '- -:- -';
    this.defaultDateText = '- -/- -/- -';

    this.state = {
      timeText: this.defaultTimeText,
      dateText: this.defaultDateText,
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.bgImageWrapper}>
          <Image source={require('./assets/images/background.jpg')} style={styles.bgImage} />
        </View>
        <Text style={styles.title}>I want my bread ready at</Text>
        <View style={styles.pickerContainer}>
          <TouchableWithoutFeedback
            onPress={this.showTimePicker.bind(this)}>
            <View>
              <Text style={styles.picker}>{this.state.timeText}</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={{width: 15}}/>
          <TouchableWithoutFeedback
            onPress={this.showDatePicker.bind(this)}>
            <View>
              <Text style={styles.picker}>{this.state.dateText}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Button containerStyle={styles.button} style={styles.buttonText}>
          Start Baking
        </Button>
      </View>
    );
  }

  async showTimePicker(event, options) {
    try {
     const {action, minute, hour} = await TimePickerAndroid.open(options);
     event.persist();
     var newState = {};
     if (action === TimePickerAndroid.timeSetAction) {
       newState['timeText'] = _formatTime(hour, minute);
       newState['hour'] = hour;
       newState['minute'] = minute;
     } else if (action === TimePickerAndroid.dismissedAction) {
       //cancel button pressed
     }
     this.setState(newState);
    } catch ({code, message}) {
      console.warn('Error: ', message);
    }
  }

  async showDatePicker(event, options) {
    try {
      var newState = {};
      const {action, year, month, day} = await DatePickerAndroid.open(options);
      event.persist();
      if (action === DatePickerAndroid.dismissedAction) {
        //cancel button pressed
      } else {
        var date = new Date(year, month, day);
        newState['dateText'] = date.toLocaleDateString();
        newState['date'] = date;
      }
      this.setState(newState);
    } catch ({code, message}) {
      console.warn('Error: ', message);
    }
  }
}



function _formatTime(hour, minute) {
  return hour + ':' + (minute < 10 ? '0' + minute : minute);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  bgImageWrapper: {
     position: 'absolute',
     top: 0, bottom: 0, left: 0, right: 0
 },
 bgImage: {
     flex: 1,
     resizeMode: "cover"
 },
  title: {
    marginTop: 150,
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
  pickerContainer: {
    flexDirection: 'row',
    height: 0,
  },
  picker: {
    backgroundColor: '#a6a6a6',
    textAlign: 'center',
    height: 40,
    fontSize: 25,
    color: '#ffffff',
    padding: 5,
  },
  button: {
    padding:10,
    marginTop: 20,
    height:45,
    overflow:'hidden',
    borderRadius:4,
    backgroundColor: 'white',
  },
  buttonText: {
    color: '#000000',
    opacity: 0.6,
  }
});

AppRegistry.registerComponent('baked', () => baked);
