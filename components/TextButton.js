import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default function ({ children, onPress, styles={}}) {
    return (
        <View>
            <TouchableOpacity onPress={onPress}>
                <Text style={styles.reset, styles}> {children}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    reset: {
        textAlign: 'center',
    }
})