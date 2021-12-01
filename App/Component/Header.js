import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MinutesToMinutesAndSeconds } from '../Utils/common';

const Header = ({ score, timeLeft, level }) => {
    return (
        <View style={styles.container} >
            <View style={styles.center} >
                <Text style={styles.textBig} >Memory game</Text>
            </View>

            <View style={styles.row} >
                <View style={styles.center} >
                    <Text style={styles.keyText} >Level</Text>
                    <Text style={styles.valueText} >{level}</Text>
                </View>
                <View style={styles.center} >
                    <Text style={styles.keyText} >Score</Text>
                    <Text style={styles.valueText} >{score}</Text>
                </View>
            </View>
            <View style={styles.row} >
                <View style={styles.center} >
                    <Text style={styles.keyText} >Time left</Text>
                    <Text style={styles.valueText} >{MinutesToMinutesAndSeconds(timeLeft)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    center: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    textBig: {
        fontSize: 20,
        fontWeight: '500',
        color: '#3498db',
    },
    keyText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#2c3e50',
    },
    valueText: {
        fontSize: 18,
        fontWeight: '300',
        color: '#e74c3c',
    }
})

export default Header;