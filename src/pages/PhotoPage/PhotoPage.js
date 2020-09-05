import React from 'react'
import {View, TouchableOpacity, Image, Text} from 'react-native'
import uploadPhoto from '../../utils/uploadPhoto'

//Components
import Camera from '../../components/Camera/Camera'
import {styles} from "./PhotoPage.style"
import ImagePicker from '../../components/ImagePicker/ImagePicker'


export default class PhotoPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            type: "back"
        }
    }

    FlipCamera = () => {
        if(this.state.type === "back")
            this.setState({
                type: "front"
            });
        else
            this.setState({
                type: "back"
            });
    };

    setCamera = ref => {
        this.camera = ref;
    };

    TakePhoto = async () => {
        if(!this.camera)
            return;

        let photo = await this.camera.takePictureAsync();

        uploadPhoto(photo).then(
            response => {
                console.log(response);
                this.props.navigation.navigate("Shower", {
                    music: response
                });
            }
        );
    };

//=============================

    render () {
        return (
            <View style={styles.Main}>
                <View style={styles.CameraBlock}>
                    <Camera type={this.state.type} setCamera={this.setCamera}/>
                </View>
                <View style={styles.BottomBlock}>
                    <View style={styles.BottomPanel}>
                        <View style={styles.FlipView}>
                            <TouchableOpacity
                                onPress={this.FlipCamera}
                            >
                                <Image
                                    source={require("../../../static/flip.png")}
                                    style={styles.FlipImage}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.TakeView}>
                            <TouchableOpacity
                                onPress={this.TakePhoto}
                                style={styles.TakeButton}>
                            </TouchableOpacity>
                        </View>
                        <ImagePicker
                            navigation={this.props.navigation}
                        />
                    </View>
                </View>
            </View>
        );
    }
}