import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';

export default class WinWin extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.winStyle}>
                <Text style={styles.winText}>{this.props.foo.toUpperCase()}</Text>
                <Text style={styles.winText}>{"CONFIDENCE: " + this.props.conf}</Text>
                <TouchableOpacity
                    onPress={this.props.handler}>
                    <Text style={styles.closeText}>CLOSE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const styles = {
    winStyle : {
        zIndex: 999,
        width: screenWidth,
        height: screenHeight*.55,
        position: 'absolute',
        top: screenHeight*.225,
        alignText: 'center',
        backgroundColor: '#88F08F',
        borderRadius: 10,
        opacity: .95
    },
    winText :{
        textAlign: 'center', // <-- the magic
        fontSize: .07*screenHeight,
        margin: .02*screenHeight,
        marginTop: .05*screenHeight,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Menlo'
    },
    closeText :{
        textAlign: 'center', // <-- the magic
        fontSize: .06*screenHeight,
        margin: .02*screenHeight,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Menlo'
    }
};
