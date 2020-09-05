import React from 'react'
import {View, TouchableOpacity, Image, Text} from 'react-native'
import uploadPhoto from '../../utils/uploadPhoto'

//Components
import Camera from '../../components/Camera/Camera'
import {styles} from "./PhotoPage.style"
import { ActivityIndicator } from "react-native";
import ImagePicker from '../../components/ImagePicker/ImagePicker'


export default class PhotoPage extends React.Component {
  static navigationOptions = {
    header: null,
    photo_uri: false,
    result_uri: undefined,
    fullDescription: false
  };

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
    this.setState({
      photo_uri: photo.uri
    });

    uploadPhoto(photo).then(
        response => {
            console.log(response);
            this.setState({
              response: response
            });
        }
    );
  };

  resetPhoto = () => {
    this.setState({
      photo_uri: undefined,
      response: undefined
    });
  };

  refactorName = (name) => {
    name = name[0].toUpperCase() + name.slice(1);
    return name;
  };

  FullDescription = () => {
    this.setState({fullDescription: true});
  };

  render () {
    return (
        <View style={styles.Main}>
          {this.state.photo_uri !== undefined ?
              <View>
                <Image
                    source={{uri: this.state.photo_uri}}
                    style={styles.TakedPhoto}
                />
              </View>
              :
              <View style={styles.CameraBlock}>
                <Camera type={this.state.type} setCamera={this.setCamera}/>
              </View>
          }
          {this.state.fullDescription ?
              <View>
              </View>
              :
              <View style={styles.BottomBlock}>
                {this.state.photo_uri !== undefined ?
                    <View style={styles.SmallInfoBlock}>
                      {this.state.response !== undefined ?
                          <View style={styles.InfoBlock}>
                            <Image
                                source={{uri: this.state.response.photo_link}}
                                style={styles.DescriptionImage}/>
                            <View style={styles.DescriptionBlock}>
                              <View style={styles.TextDescriptionBlock}>
                                <View>
                                  <Text style={styles.DescriptionName}>
                                    {this.refactorName(this.state.response.rus_name)}
                                  </Text>
                                </View>
                                <View>
                                  <Text style={styles.DescriptionDescription}>
                                    {this.state.response.brief}
                                  </Text>
                                </View>
                              </View>
                              <View style={styles.DetailedButtonBlock}>
                                <TouchableOpacity
                                    style={styles.DetailedButton}
                                    onPress={this.FullDescription}
                                >
                                  <Text style={styles.DetailedText}>Подробнее</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                          :
                          <View>
                            <ActivityIndicator
                                color="#00BFFF"
                                size="small"
                            />
                          </View>
                      }
                      <TouchableOpacity style={styles.SmallInfoExitButton} onPress={this.resetPhoto}>
                        <Image source={require('../../../static/X.png')}/>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.BottomPanel}>
                      <View style={styles.FlipView}>
                        <TouchableOpacity
                            onPress={this.FlipCamera}
                            style={styles.FlipButton}
                        >
                          <Image
                              source={require('../../../static/map.png')}
                              style={styles.FlipImage}/>
                        </TouchableOpacity>
                      </View>
                      <View style={styles.TakeView}>
                        <TouchableOpacity
                            onPress={this.TakePhoto}
                            style={styles.TakeButton}>
                          <Image
                              source={require("../../../static/Camera.png")}
                              style={styles.TakeImage}
                          />
                        </TouchableOpacity>
                      </View>
                      <ImagePicker
                          navigation={this.props.navigation}
                      />
                    </View>
                }
              </View>
          }
        </View>
    );
  }
}