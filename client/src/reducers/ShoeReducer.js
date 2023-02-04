import { ShoeEventType } from "../actions/ShoeEvent";

const initState = {
    shoeInfo: [],
};
export default function ShoeReducer(state = initState, action) {
    switch (action.type) {
        case ShoeEventType.shoes:
            return {
                ...state,
                shoeInfo: [...action.shoeInfo],
            };
        default:
            return state;
    }
}
