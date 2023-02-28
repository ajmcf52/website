import { CartEventType } from "../actions/CartEvent";

const initState = {
    cartState: [],
    itemCount: 0,
};
export default function CartReducer(state = initState, action) {
    let updatedCartState = undefined;
    const oldCount = state.itemCount;
    let currCount = state.itemCount;
    let skuFound = false;

    switch (action.type) {
        case CartEventType.addToCart:
            updatedCartState = state.cartState.map((obj) => {
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
                itemCount: currCount + action.numAdded,
            };

        case CartEventType.removeFromCart:
            updatedCartState = state.cartState.map((obj) => {
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
                itemCount: Math.max(0, oldCount - action.numRemoved),
            };

        case CartEventType.addMany:
            let dataObjs = action.dataObjs;
            let skuFoundArr = new Array(dataObjs.length);
            skuFoundArr.fill(false);

            updatedCartState = state.cartState.map((obj) => {
                var i = 0;
                for (const dataObj in dataObjs) {
                    if (dataObj.skuAdded === obj.sku) {
                        skuFoundArr[i] = true;
                        currCount += dataObj.numAdded;
                        return {
                            ...obj,
                            quantity: obj.quantity + dataObj.numAdded,
                        };
                    }
                    i++;
                }
                return obj;
            });

            for (var i = 0; i < dataObjs.length; i++) {
                if (!skuFoundArr[i]) {
                    currCount += dataObjs[i].numAdded;
                    updatedCartState.push({ sku: dataObjs[i].skuAdded, quantity: dataObjs[i].numAdded });
                }
            }
            return { ...state, cartState: updatedCartState, itemCount: currCount };

        case CartEventType.removeMany:
            dataObjs = action.dataObjs;

            updatedCartState = state.cartState.map((obj) => {
                for (var dataObj in dataObjs) {
                    if (dataObj.skuRemoved === obj.sku) {
                        currCount = Math.max(0, currCount - dataObj.numRemoved);
                        return {
                            ...obj,
                            quantity: Math.max(0, obj.quantity - dataObj.numRemoved),
                        };
                    }
                }
                return obj;
            });
            return {
                ...state,
                cartState: updatedCartState,
                itemCount: currCount,
            };

        case CartEventType.clearCart:
            return {
                ...state,
                cartState: [],
                itemCount: 0,
            };

        default:
            return state;
    }
}
