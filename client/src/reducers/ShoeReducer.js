import { ShoeEventType } from "../actions/ShoeEvent";

const initState = {
    shoeInfo: [],
};
export default function ShoeReducer(state = initState, action) {
    let updatedShoeInfo = undefined;

    switch (action.type) {
        case ShoeEventType.shoes:
            return {
                ...state,
                shoeInfo: [...action.shoeInfo],
            };

        case ShoeEventType.quantitySelectIncr:
            updatedShoeInfo = action.shoeInfo.map((obj, idx) => {
                if (idx === action.idx) {
                    return {
                        ...obj,
                        selected_quantity: obj.selected_quantity + 1,
                    };
                } else return obj;
            });
            return {
                ...state,
                shoeInfo: updatedShoeInfo,
            };

        case ShoeEventType.quantitySelectDecr:
            updatedShoeInfo = action.shoeInfo.map((obj, idx) => {
                if (idx === action.idx) {
                    return {
                        ...obj,
                        selected_quantity: Math.max(1, obj.selected_quantity - 1),
                    };
                } else return obj;
            });
            return {
                ...state,
                shoeInfo: updatedShoeInfo,
            };
        default:
            return state;
    }
}
