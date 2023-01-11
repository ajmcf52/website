import { TokenEventType } from "../actions/TokenEvent";

const initState = {
    accessToken: "",
};

export default function TokenReducer(state = initState, action) {
    switch (action.type) {
        case TokenEventType.newToken:
            return {
                ...state,
                accessToken: action.accessToken,
            };
        case TokenEventType.tokenRevoked:
            return {
                ...state,
                accessToken: null,
            };
        default:
            return state;
    }
}
