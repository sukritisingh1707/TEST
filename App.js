import { SafeAreaView, StyleSheet, StatusBar, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import Header from "./src/components/Header"
import { Provider } from "react-redux";
import store from "./src/redux/Store";

// import AsyncStorage from '@react-native-async-storage/async-storage';

import { colors } from './src/constants/Colors'
import Navigator from './src/navigation/Navigator';
const App = () => {


  return (

    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          animated={true}
          backgroundColor={colors.BACKGROUND}

        />
        {/* //  <Header /> */}
        {/* //  <Header back title={"Order History"} /> */}
        <Navigator />


      </SafeAreaView>
    </Provider>

  )
}

export default App

const styles = StyleSheet.create({})