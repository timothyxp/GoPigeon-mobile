import React from 'react'
import {View, TouchableOpacity, Image, Text, ScrollView} from 'react-native'
import uploadPhoto from '../../utils/uploadPhoto'

//Components
import Camera from '../../components/Camera/Camera'
import {styles} from "./PhotoPage.style"
import { ActivityIndicator } from "react-native";
import ImagePicker from '../../components/ImagePicker/ImagePicker'

let FoodBackgrounds = ['#FFBF19', '#FF9B19', '#3CD695', '#19C8FF', '#F16CBC'];


export default class PhotoPage extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      type: "back",
      photo_uri: undefined,
      result_uri: undefined,
      fullDescription: undefined,
      subbar_panel: 'description',
      error_count: 0,
      error: false
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

    this.processPhoto(photo);
  };

  processPhoto = (photo) => {
    this.setState({
      photo_uri: photo.uri
    });

    uploadPhoto(photo).then(
        response => {
          console.log("response is ", response);
          let errors_count = this.state.error_count;
          let error = this.state.error;

          console.log("category_name", response.category_name);
          if(response.category_name === 'undefined_bird') {
            error = true;
            errors_count += 1;
          } else {
            error = false;
            errors_count = 0;
          }
          this.setState({
            response: response,
            error: error,
            error_count: errors_count
          });
        }
    );
  };

  resetPhoto = () => {
    this.setState({
      photo_uri: undefined,
      response: undefined,
      error: false
    });
  };

  refactorName = (name) => {
    name = name[0].toUpperCase() + name.slice(1);
    return name;
  };

  FullDescription = () => {
    this.setState({fullDescription: true});
  };

  changePanel = (panel) => {
    this.setState({subbar_panel: panel});
  };

  render () {
    console.log("error count", this.state.error_count);
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
              <View style={styles.BottomBlock}>
                {this.state.fullDescription ?
                  <View style={styles.FullDescriptionBlock}>
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
                    </View>
                    <View style={styles.GrayLine}/>
                    <ScrollView>
                    <View style={styles.SubMenu}>
                      <TouchableOpacity
                          style={this.state.subbar_panel === "description" ?
                          styles.SubBarButtonActive: styles.SubButton}
                          onPress={this.changePanel.bind(this, "description")}
                      >
                        <Text style={this.state.subbar_panel === "description" ?
                            styles.SubButtonActiveText: styles.SubButtonText}>
                          Описание
                        </Text>
                      </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.subbar_panel === "food" ?
                                styles.SubBarButtonActive: styles.SubButton}
                            onPress={this.changePanel.bind(this, "food")}
                        >
                          <Text style={this.state.subbar_panel === "food" ?
                              styles.SubButtonActiveText: styles.SubButtonText}>
                            Рацион
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={this.state.subbar_panel === "challenge" ?
                                styles.SubBarButtonActive: styles.SubButton}
                            onPress={this.changePanel.bind(this, "challenge")}
                        >
                          <Text style={this.state.subbar_panel === "challenge" ?
                              styles.SubButtonActiveText: styles.SubButtonText}>
                            Челлендж
                          </Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.subbar_panel === 'description' ?
                      <View>
                        <View style={styles.FullDescription2Block}>
                          <Text style={styles.FullDescription2}>
                            Описание
                          </Text>
                          <Text style={styles.FullDescription3}>
                            {this.state.response.description}
                          </Text>
                        </View>
                        <View style={{marginTop: 20, marginLeft: 20, alignItems: "flex-start"}}>
                          <Text style={styles.FullDescription2}>
                            Отметки на карте
                          </Text>
                        <Image
                            style={styles.BirdMapImage}
                          source={require('../../../static/bird_map.png')}
                        />
                        </View>
                      </View>
                    : this.state.subbar_panel === 'food' ?
                      <View style={styles.FullDescription2Block}>
                        <Text style={styles.FullDescription2}>
                          Рацион
                        </Text>
                        <View style={styles.FoodBlock}>
                        {this.state.response.food.split(',').map((name, index) => {
                          return(
                          <View key={index} style={{
                            backgroundColor: FoodBackgrounds[index % FoodBackgrounds.length],
                            height: 30,
                            paddingLeft: 10,
                            paddingRight: 10,
                            borderRadius: 10,
                            marginTop: 10,
                            marginRight: 10,
                            justifyContent: "center",
                            alignItems: "center"
                          }}>
                            <Text style={styles.FoodTextBlock}>
                              {name}
                            </Text>
                          </View>

                          );})}
                        </View>
                      </View>
                      :
                      <View style={{justifyContent: "center", alignItems: "center"}}>
                        <Image
                            style={styles.ChallengeImage}
                            source={require('../../../static/challenge.png')}/>
                      </View>

                    }
                    </ScrollView>
                  </View>
                  : this.state.photo_uri !== undefined ?
                  <View style={styles.SmallInfoBlock}>
                    {this.state.response !== undefined ?
                        this.state.error_count === 1 || this.state.error_count === 2 ?
                          <View style={styles.ErrorBlock}>
                            <Image
                                style={styles.ErrorImageBlock}
                                source={require('../../../static/bird_not_found.png')}/>
                            <View style={styles.ErrorSubBlock}>
                              <Text style={styles.ErrorName}>
                                Упс..Птичка не найдена
                              </Text>
                            </View>
                            <View style={styles.ErrorSubBlock}>
                              <Text style={styles.ErrorDescription}>
                                Пожалуйста попробуйте сделать фото птицы ещё раз, если она ещё не улетела
                              </Text>
                            </View>
                          </View>
                            :
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
                        processPhoto={this.processPhoto}
                    />
                  </View>
                }
              </View>
        </View>
    );
  }
}