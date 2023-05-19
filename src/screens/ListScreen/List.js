import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, FlatList, View, Image } from 'react-native'
import React, { useState, useEffect, useCallback } from 'react'
import { fp, hp, wp } from '../../helpers/resDimensions'
import Header from '../../components/Header'
import getApiUrl from "../../api/ApiConfig"
import CardView from 'react-native-cardview'
import { UseSelector, useDispatch, useSelector } from "react-redux"
import { apiGet } from '../../api/Api'
import { DashboardActions } from '../../redux/actions/List'
import NavigationString from '../../constants/NavigationString'
import { fonts } from '../../constants/Topography'
import { colors } from '../../constants/Colors'

const List = (props) => {

    const ListData = useSelector((state) => state)

    const dispatch = useDispatch()

    useEffect(() => { getData(); }, [])

    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState({ "data": [], "page": 1, "per_page": 3, "total": 0, "total_pages": 0 });
    const [offset, setOffset] = useState(1);

    // console.log("==>", dataSource)

    useEffect(() => {
        console.log("dataSource =>", dataSource);
    }, [dataSource])

    useEffect(() => {
        console.log("ListData  1==>", ListData);
        switch (ListData.List.type) {
            case "LIST_SUCCESS":
                // console.log("ListData 2==>", ListData);
                if (ListData.List.LISTDetails && ListData.List.LISTDetails.data.length > 0) {
                    let resp = ListData.List.LISTDetails;
                    console.log("IIIIIIII", resp.data.concat(dataSource.data));
                    setDataSource({ "page": resp.page, "per_page": resp.per_page, "total": resp.total, "total_pages": resp.total_pages, data: resp.data.concat(dataSource.data) });
                }
                setLoading(false);
                break;
            case "LIST_FAILURE":
                setLoading(false);
                break;
            default:
                break;
        }
    }, [ListData])

    const getData = () => {
        // console.log('getData', offset);
        let url = `https://reqres.in/api/users?page=${dataSource.page}&per_page=${dataSource.per_page}`
        console.log("url on page ", url)
        dispatch(DashboardActions({ url }));
    };

    console.log("api data", dataSource)

    const renderFooter = useCallback(
        ({ item }) => {
            if (dataSource.total === dataSource.data.length) {
                return (
                    //Footer View with Load More button
                    <View style={styles.footer}>
                        <Text>That's all folks.</Text>
                    </View>
                );
            } else if (loading) {
                return (
                    //Footer View with Load More button
                    <View style={styles.footer}>
                        <ActivityIndicator
                            color="green"
                            size="large"
                            style={{ marginLeft: 8 }} />


                    </View>
                );
            }
        }, [dataSource])

    const ItemView = useCallback(
        ({ item }) => {
            console.log("ITEM", item)
            return (
                <TouchableOpacity onPress={() => props.navigation.navigate(NavigationString.DETAILS, { item })}>
                    <CardView
                        cardElevation={2}
                        cardMaxElevation={5}
                        cornerRadius={5}
                        style={styles.card}>
                        <View style={styles.cardMainContainer}>
                            <Image source={{ uri: item.avatar }} style={styles.Img} resizeMode="cover" />
                        </View>
                        <View style={styles.cardSubContainer}>
                            <Text style={styles.textStyle}>{item.first_name}{" "}{item.last_name}</Text>

                            <Text style={styles.textStyle}>{item.email}</Text>

                        </View>
                    </CardView>
                </TouchableOpacity>
            );
        }, [dataSource])

    const ItemSeparatorView = useCallback(() => {
        return (<View style={{
            height: hp(2),
            width: '100%'
            // backgroundColor: 'red',
        }}
        />
        );
    }, [dataSource])


    const onEndReached = () => {
        // setOffset(offset + 1)
        if (dataSource.total !== dataSource.data.length) {
            setDataSource({ ...dataSource, page: dataSource.page + 1 });
            setLoading(true);
        }
    }

    useEffect(() => {
        // console.log("dataSource 5656", dataSource.total, dataSource.data.length, dataSource.total !== dataSource.data.length);
        if (dataSource.total !== dataSource.data.length) {
            // console.log("Hitting ");
            getData();
        }
    }, [dataSource.page])

    const keyExtract = useCallback((item) => `${item?.id}`)

    return (

        <View style={styles.mainContainer}>
            <Header title={"User List"} />
            <View style={styles.listView}>
                <FlatList
                    data={dataSource.data}
                    keyExtractor={() => keyExtract()}
                    ItemSeparatorComponent={ItemSeparatorView()}
                    // enableEmptySections={true}
                    renderItem={ItemView}
                    onEndReached={() => onEndReached()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={loading && renderFooter}
                    extraData={dataSource.data.length}

                />
            </View>
        </View>
    )
}

export default List

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
    card: {
        height: hp(10),
        width: wp(90),
        // margin: hp(2.2),
        alignSelf: "center",
        flexDirection: "row",
        backgroundColor: "white"
    },
    cardMainContainer: {
        height: hp(10),
        width: wp(25),

        justifyContent: "center",
        alignItems: "center"
    },
    cardSubContainer: {
        height: hp(10),
        width: wp(65),
        justifyContent: "space-evenly",
    },
    Img: { height: hp(9), width: wp(20), borderRadius: hp(22) },
    textStyle: {
        fontFamily: fonts.SEMI_BOLD,
        color: "grey",
        fontSize: fp(1.9)
    }
})