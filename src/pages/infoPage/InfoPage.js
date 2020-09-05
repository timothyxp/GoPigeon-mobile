import React from 'react';
import {View, Text} from 'react-native';


export default class InfoPage extends React.Component{
    render() {
      console.log(this.props.music);
        return(
            <View>
                <Text>
                    Info Page
                </Text>
            </View>
        );
    }
}