import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
    Details,
    List
} from "../screens";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";
import NavigationString from '../constants/NavigationString';


const Navigator = () => {
    const Stack = createNativeStackNavigator();
    function MyStack() {
        return (
            <Stack.Navigator initialRouteName={List}>
                <Stack.Screen
                    name={NavigationString.LIST}
                    component={List}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS, // To open stack screen Top to Bottom
                    }}
                />
                <Stack.Screen
                    name={NavigationString.DETAILS}
                    component={Details}
                    options={{
                        headerShown: false,
                        ...TransitionPresets.ModalSlideFromBottomIOS, // To open stack screen Top to Bottom
                    }}
                />
            </Stack.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    )
}

export default Navigator

const styles = StyleSheet.create({})