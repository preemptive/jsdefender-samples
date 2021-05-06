export const SET_USER = "SET_USER";
export const REMOVE_USER = "REMOVE_USER";

/**
 * Redux action to add user to store
 */
export default function addUser(name) {
    const action = {
        type: SET_USER,
        name: name,
    }
    return action;
}

/**
 * Redux action to remove user to store
 */
export function removeUser(){
    const action = {
        type: REMOVE_USER,
    };
    return action;
}