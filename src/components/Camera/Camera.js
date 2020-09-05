import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class CameraComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            hasCameraPermission: null
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        type = Camera.Constants.Type.back;

        if(this.props.type === "front")
            type = Camera.Constants.Type.front;

        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera style={{ flex: 1 }} type={type} ref={ref => this.props.setCamera(ref)}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}