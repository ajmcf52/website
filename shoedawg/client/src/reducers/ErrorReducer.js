import { ErrorEventType } from "../actions/ErrorEvent";

const initState = {
    globalError: false,
    errorType: "",
};

export default function ErrorReducer(state = initState, action) {
    switch (action.type) {
        case ErrorEventType.refreshTokenExpiry:
            return { ...state, errorType: "RefreshTokenExpiry", globalError: true };
        default:
            return state;
    }
}
