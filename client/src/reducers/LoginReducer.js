import { LoginEventType } from "../actions/LoginEvent";

const initState = {
    loggedIn: false,
};

export default function LoginReducer(state = initState, action) {
    switch (action.type) {
        case LoginEventType.login:
            return {
                ...state,
                loggedIn: true,
                email: action.userInfo.email,
                fname: action.userInfo.fname,
                accessToken: action.userInfo.accessToken,
            };
        case LoginEventType.logout:
            return {
                ...state,
                loggedIn: false,
            };
        default:
            return state;
    }
}
