import { StyleSheet, Image, Text, View, TouchableOpacity, Platform, SafeAreaView } from 'react-native';
import React from 'react';
import { hp, wp, fp } from '../helpers/resDimensions';
import { colors } from '../constants/Colors';
import { fonts } from '../constants/Topography';

import { BACKICON } from '../assets/images/Icon';
import NavigationString from '../constants/NavigationString';

const Header = (props) => {
    const { back, title, navigation } = props
    console.log("pops", props)
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>

                {back ?
                    <>
                        <TouchableOpacity onPress={props.onPress}>
                            <View style={styles.backContainer}>
                                <Image source={BACKICON} resizeMode="contain" style={styles.imageStyle} />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.subContainerOne}>

                            <Text style={{ color: colors.WHITE, fontFamily: fonts.BOLD, fontSize: fp(2.2), }}>{title}</Text>
                        </View></> : <View style={styles.subContainerTwo}>

                        <Text style={{ color: colors.WHITE, fontFamily: fonts.BOLD, fontSize: fp(2.2), }}>{title}</Text>
                    </View>}


                {/* <View style={styles.subContainerOne}>

                            <Text style={{ color: colors.WHITE, fontFamily: fonts.BOLD, fontSize: fp(2.2), }}>{title}</Text>
                        </View> */}



            </View>
        </SafeAreaView>
    );
};

export default Header;

const styles = StyleSheet.create({
    mainContainer: {
        height: Platform.OS === 'ios' ? hp(7) : hp(8),
        width: wp(100),
        backgroundColor: colors.HEADERBACKGROUND,


        flexDirection: 'row',
    },
    subContainerOne: {
        height: Platform.OS === 'ios' ? hp(7) : hp(8),
        width: wp(85),
        flexDirection: "row",
        backgroundColor: colors.TRANSPARENT,


        justifyContent: "center",
        alignItems: "center",

    },
    subContainerTwo: {
        height: Platform.OS === 'ios' ? hp(7) : hp(8),
        width: wp(85),
        flexDirection: "row",
        backgroundColor: colors.TRANSPARENT,


        justifyContent: "center",
        alignItems: "center",

    },
    backContainer: { justifyContent: "center", alignItems: "center", height: hp(7), width: wp(15) },
    imageStyle: {
        tintColor: "white"
    }

});
