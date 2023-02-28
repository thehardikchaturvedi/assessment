import {createStore} from "redux";

export const reducer = (state = {}, action) => {
    const {type} = action;

    switch (type){

        case "SET_USER":
            return {
                ...state,
                user: action.user
            };

        default:
            return state;
    }
};


export const store = createStore(reducer);