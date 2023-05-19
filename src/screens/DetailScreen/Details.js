import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { fp, hp, wp } from '../../helpers/resDimensions'
import { useDispatch, useSelector } from "react-redux"
import { fonts } from '../../constants/Topography'
import { colors } from '../../constants/Colors'
import { BACKICON } from '../../assets/images/Icon'

const Details = (props) => {



    const ListData = useSelector((state) => state)
    const dispatch = useDispatch()
    console.log("pops", props)
    console.log("999  in List Data", ListData?.List?.LISTDetails?.data)
    let dataa = ListData.List.LISTDetails?.data
    console.log(" 777 in List Data ", dataa)
    const id = props?.route.params?.item?.id

    useEffect(() => {

        filterdata()
    }, [])
    const [dataSource, setDataSource] = useState([]);
    // const [source, setSource] = useState();
    // 

    const filterdata = () => {
        let filteredData = dataa?.filter(function (item) {
            return (item.id == id);
        })

        let a = dataa.filter((item) => item.id == id)
        console.log("///////", a);

        console.log("===555==> 9999", filteredData);
        setDataSource(filteredData)
    }



    console.log("data in params", id, dataSource)

    return (

        <View style={styles.mainContainer}>
            <Header back onPress={() => props.navigation.goBack()} title={"User Detail"} />
            <View style={styles.listView}>
                <View style={styles.imgView}>
                    <Image source={{ uri: dataSource[0]?.avatar }} style={styles.Img} resizeMode="cover" />
                    {/* <Image source={BACKICON} style={styles.Img} resizeMode="cover" /> */}

                </View>
                <View style={{ height: hp(20), width: wp(100), justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.textStyle}>{dataSource[0]?.email}</Text>
                    <Text style={styles.textStyle}>{dataSource[0]?.first_name}{" "}{dataSource[0]?.last_name}</Text>
                </View>
            </View>
        </View>
    )
}

export default Details

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        height: hp(100),
        width: wp(100),

    },
    listView: {
        height: hp(90),
        width: wp(100),
        backgroundColor: "#E1E1E1"
    },
    Img: { height: hp(15), width: wp(35), borderRadius: hp(22) },
    textStyle: {
        fontFamily: fonts.SEMI_BOLD,
        color: "grey",
        fontSize: fp(1.9)
    },
    imgView: {
        height: hp(20), width: wp(100), justifyContent: "center", alignItems: "center"
    }

})