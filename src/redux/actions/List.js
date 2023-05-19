import { apiGet } from "../../api/Api";

import { LIST_ACTIONS } from "../Types";

// ****** Dashboard Details Api Actions ******
export const DashboardActions = (url, payload, headers) => (dispatch) => {
    console.log("my url", url?.url,)
    apiGet(url?.url, payload, headers)
        .then(async (response) => {
            // console.log("my response", response)
            // if (response == 200) {
            console.log("my response 9", response)
            dispatch({
                type: LIST_ACTIONS.LIST_SUCCESS,
                payload: response,
            });
            // } else {
            // showErrorMessage("Network Error");
            //  dispatch({ type: LIST_ACTIONS.LIST_FAILURE });
            // }
        })
        .catch((err) => {
            dispatch({ type: LIST_ACTIONS.LIST_FAILURE });
        });
};