import React from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';

export default class WinWin extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const food = this.props.foo.toUpperCase().split('_');
        return (
            <View style={styles.winStyle}>
                <Text style={styles.winText}>{food.map(x => x+' ')}</Text>
                <Text style={styles.winText}>{"CONFIDENCE: " + Math.round(this.props.conf*100) / 100}</Text>
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
        fontSize: .06*screenHeight,
        margin: .02*screenHeight,
        marginTop: .05*screenHeight,
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontFamily: 'Menlo'
    },
    closeText :{
        textAlign: 'center', // <-- the magic
        fontSize: .05*screenHeight,
        margin: .02*screenHeight,
        color: 'black',
        fontWeight: 'bold',
        fontFamily: 'Menlo'
    }
};
