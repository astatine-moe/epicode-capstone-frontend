export default function activeUser(state = {}, action) {
    switch (action.type) {
        case "SET_USER":
            console.log("SET_USER", action.payload);
            return action.payload;
        default:
            return state;
    }
}
