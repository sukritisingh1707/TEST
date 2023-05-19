import { LIST_ACTIONS } from "../Types";

const initial_state = {
    loading: false,
    LISTDetails: {},
    // offset: 1
};

export default function (state = initial_state, action) {
    switch (action.type) {
        case LIST_ACTIONS.LIST_SUCCESS:
            return {
                LISTDetails: action.payload,
                loading: false,
                // offset: offset + 1,
                type: action.type,
            };

        case LIST_ACTIONS.LIST_FAILURE:
            return { ...state, loading: false, type: action.type };

        default:
            return { ...state };
    }
}
