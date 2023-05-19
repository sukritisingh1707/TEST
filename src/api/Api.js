import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../redux/Store';
import types from '../redux/Types';

const { dispatch, getState } = store;

// export async function getHeaders() {
//   let userData = await AsyncStorage.getItem('userData'); // Old Code
//   let userDataTwo = await AsyncStorage.getItem('Token'); // 1 September
//   return {
//     Authorization: `Bearer ${userDataTwo}`, // 1 September
//   };

//   // New Code 1 September 2022
//   // if (userDataTwo) {
//   //   return {
//   //     Authorization: `Bearer ${userDataTwo}`, // 1 September
//   //   };
//   // }
//   return {};
// }
export async function getHeaders() {
    const AuthToken = await AsyncStorage.getItem('Token');
    if (AuthToken) {
        return {
            Authorization: `Bearer ${AuthToken}`,
        };
    }
}

export async function apiReq(
    endPoint,
    data,
    method,
    headers,
    requestOptions = {},
) {
    return new Promise(async (res, rej) => {
        const getTokenHeader = await getHeaders();
        headers = {
            ...getTokenHeader,
            ...headers,
        };

        if (method === 'get' || method === 'delete') {
            data = {
                ...requestOptions,
                ...data,
                headers,
            };
        }

        axios[method](endPoint, data, { headers })
            .then(result => {
                const { data } = result;

                // if (data.status === false) {
                //   return rej(data);
                // }

                return res(data);
            })
            .catch(error => {
                console.log(error);
                console.log(error && error.response, 'the error respne');
                if (error && error.response && error.response.status === 401) {
                    clearUserData();
                    dispatch({
                        type: types.CLEAR_REDUX_STATE,
                        payload: {},
                    });
                    dispatch({
                        type: types.NO_INTERNET,
                        payload: { internetConnection: true },
                    });
                }
                if (error && error.response && error.response.data) {
                    if (!error.response.data.message) {
                        return rej({
                            ...error.response.data,
                            msg: error.response.data.message || 'Network Error',
                        });
                    }
                    return rej(error.response.data);
                } else {
                    return rej({ message: 'Network Error', msg: 'Network Error' });
                }
                return rej(error);
            });
    });
}

// *************** API COMPONENETS FILE ENDS HERE ***************

// ****** POST Api Methods ******
export function apiPost(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'post', headers);
}

// ****** DELETE Api Methods ******
export function apiDelete(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'delete', headers);
}

// ****** GET Api Methods ******
export function apiGet(endPoint, data, headers = {}, requestOptions) {
    console.log("in api ",)
    return apiReq(endPoint, data, 'get', headers, requestOptions);
}

// ****** PUT Api Methods ******
export function apiPut(endPoint, data, headers = {}) {
    return apiReq(endPoint, data, 'put', headers);
}

// ****** SET ITEM on Async Storage ******
export function setItem(key, data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem(key, data);
}

// ****** GET ITEM From Async Storage ******
export function getItem(key) {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key).then(data => {
            resolve(JSON.parse(data));
        });
    });
}

// ****** REMOVE Token From Async Storage ******
export function removeItem(key) {
    return AsyncStorage.removeItem(key);
}

// ****** CLEAR Async Storage ******
export function clearAsyncStorate(key) {
    return AsyncStorage.clear();
}

// ****** SET User Data/Details on Async Storage ******
export function setUserData(data) {
    data = JSON.stringify(data);
    return AsyncStorage.setItem('userData', data);
}

// ****** GET User Daata/Details From Async Storage ******
export async function getUserData() {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('userData').then(data => {
            resolve(JSON.parse(data));
        });
    });
}

// ****** CLEAR User Data From Async Storage ******
export async function clearUserData() {
    return AsyncStorage.removeItem('userData');
}
