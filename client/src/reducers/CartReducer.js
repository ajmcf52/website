import { CartEventType } from "../actions/CartEvent";

const initState = {
    cartState: [],
    itemCount: 0,
};
export default function CartReducer(state = initState, action) {
    let updatedCartState = undefined;
    const oldItemCount = state.itemCount;
    let skuFound = false;
    switch (action.type) {
        case CartEventType.addToCart:
            updatedCartState = action.cartState.map((obj) => {
                if (action.skuAdded === obj.sku) {
                    skuFound = true;
                    return {
                        ...obj,
                        quantity: obj.quantity + action.numAdded,
                    };
                } else return obj;
            });
            if (!skuFound) updatedCartState.push({ sku: action.skuAdded, quantity: action.numAdded });
            return {
                ...state,
                cartState: updatedCartState,
                itemCount: oldItemCount + action.numAdded,
            };
        case CartEventType.removeFromCart:
            updatedCartState = action.cartState.map((obj) => {
                if (action.skuRemoved === obj.sku) {
                    return {
                        ...obj,
                        quantity: Math.max(0, obj.quantity - action.numRemoved),
                    };
                } else return obj;
            });
            return {
                ...state,
                cartState: updatedCartState,
                itemCount: Math.max(0, oldItemCount - action.numRemoved),
            };
        default:
            return state;
    }
}
