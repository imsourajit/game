import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CreateArrayOfSize } from '../Utils/common';
import Card from './Card';

const Grid = ({ rows, columns, cards, onPressCard }) => {
    return (
        <View style={styles.wrap}>
            {
                CreateArrayOfSize(rows).map((r) => (
                    <View style={styles.row} >
                        {
                            CreateArrayOfSize(columns).map((c) => {
                                return (
                                    <Card 
                                        card={cards[`${r},${c}`]}
                                        row={r}
                                        column={c}
                                        onPress={onPressCard}
                                    />
                                )
                            })
                        }
                    </View>
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        padding: 5
    },
    card: {
        flex: 1,
        padding: 5,
        margin: 5,
        borderWidth: 1
    }
})

export default Grid;