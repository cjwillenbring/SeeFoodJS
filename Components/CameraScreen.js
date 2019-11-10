import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import Axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import WinWin from './WinWin.js';

export default class CameraExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            loading: false,
            isWinner: false,
            data: {
                food: "",
                confidence: 0
            }
        };
        this.handler = this.handler.bind(this)
    }

    handler() {
        this.setState({data: { food: "", confidence: 0} })
    }

    async snapPhoto() {
        console.log('Button Pressed');
        if (this.camera) {
            console.log('Taking photo');
            const options = { quality: .5, base64: true, fixOrientation: true, exif: true};
            this.setState({ loading: true });
            console.log('loading should now be on');
            /* for testing
            result = {
              data: {
                food: "apple pie",
                confidence: .99
              }
            }
            this.setState({loading: false, isWinner: true, data : { food : result.data.food, confidence : result.data.confidence}});
            */
            await this.camera.takePictureAsync(options).then(photo => {
                photo.exif.Orientation = 1;
                //TODO: replace with actual api call
                Axios.get('https://swapi.co/api/people/1/')
                    .then(result => {
                        this.setState({loading: false, isWinner: true, data : { food : result.data.food, confidence : result.data.confidence}});
                        //console.log(result.data.name);
                        setTimeout(() => Alert.alert("It's " + result.data.name), 50);
                    }).catch( () => {
                    this.setState({loading: false});
                    setTimeout(() => Alert.alert("Failed to get data from api"), 50);
                });
            })
        }
    }

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    }

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1, backgroundColor: '#ebebeb' }}>
                    {this.state.data.confidence > .5 && this.state.data.food !== "" ?
                        <WinWin foo={this.state.data.food} conf={this.state.data.confidence} handler={this.handler}/> : null}
                    <Spinner
                        visible={this.state.loading}
                        textContent={'Loading...'}
                        textStyle={styles.descText}
                    />
                    <Camera style={styles.cameraContainer} ref={ (ref) => {this.camera = ref} } type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                        </View>
                    </Camera>
                    <View style={styles.container}>
                        <View>
                            <TouchableOpacity
                                disabled={!!(this.state.data.confidence > .5 && this.state.data.food)}
                                style={styles.buttonStyle}
                                onPress={this.snapPhoto.bind(this)}>
                                <Text style={styles.descText}>FIND MY FOOD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F2F2F5',
        height: screenHeight,
        paddingTop: 60,
        alignItems: 'center'
    },
    buttonStyle: {
        height: .2*screenHeight,
        width: .8*screenWidth,
        zIndex: 998,
        backgroundColor: '#FF5A5F',
        borderRadius: .01*screenHeight
    },
    cameraContainer :{
        height : screenWidth,
        marginTop: screenHeight*.05,
        borderRadius: 3
    },
    descText :{
        textAlign: 'center', // <-- the magic
        fontSize: .06*screenHeight,
        margin: .02*screenHeight,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Menlo'
    }
});
