import React, {
  Component
} from 'react';
import {CardItem,Icon, Text} from 'native-base';
import styles from '../styles/mainstyle.js';
 
class ListItem extends Component {
  render() {
    return (
      <CardItem>
          <Icon name='md-create' />
          <Text>{this.props.act.name}</Text>
          <Icon name='md-checkmark' onPress={() => this.props.onActCompletion()}/>
      </CardItem>
    );
  }
}
 
module.exports = ListItem;