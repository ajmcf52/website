import { CartEventType } from "../actions/CartEvent";

const initState = {
    cartState: [],
    itemCount: 0,
    subtotal: 0,
};
export default function CartReducer(state = initState, action) {
    let updatedCartState = undefined;
    const oldCount = state.itemCount;
    let currCount = state.itemCount;
    let skuFound = false;
    let currTotal = state.subtotal;

    switch (action.type) {
        case CartEventType.addToCart:
            updatedCartState = state.cartState.map((obj) => {
                if (action.sku === obj.sku) {
                    skuFound = true;
                    return {
                        ...obj,
                        quantity: obj.quantity + action.quantity,
                    };
                } else return obj;
            });
            if (!skuFound) updatedCartState.push({ sku: action.sku, quantity: action.quantity, shoeName: action.name, shoePrice: action.price });
            return {
                ...state,
                cartState: updatedCartState,
                itemCount: currCount + action.quantity,
                subtotal: currTotal + action.price * action.quantity,
            };

        case CartEventType.removeFromCart:
            updatedCartState = state.cartState
                .map((obj) => {
                    if (action.sku === obj.sku) {
                        return {
                            ...obj,
                            quantity: obj.quantity - action.quantity,
                        };
                    } else return obj;
                })
                .filter((obj) => obj.quantity > 0);
            return {
                ...state,
                cartState: updatedCartState,
                itemCount: Math.max(0, oldCount - action.quantity),
                subtotal: Math.max(0, currTotal - action.price * action.quantity),
            };

        case CartEventType.addMany:
            if (state.cartState.length > 0) {
                return state;
            }
            let dataObjs = action.dataObjs;
            let skuFoundArr = new Array(dataObjs.length);
            skuFoundArr.fill(false);

            updatedCartState = state.cartState.map((obj) => {
                var i = 0;
                for (const dataObj in dataObjs) {
                    if (dataObj.sku === obj.sku) {
                        skuFoundArr[i] = true;
                        currCount += dataObj.quantity;
                        currTotal += dataObj.price * dataObj.quantity;
                        return {
                            ...obj,
                            quantity: obj.quantity + dataObj.quantity,
                        };
                    }
                    i++;
                }
                return obj;
            });

            for (var i = 0; i < dataObjs.length; i++) {
                if (!skuFoundArr[i]) {
                    currCount += dataObjs[i].quantity;
                    currTotal += dataObjs[i].price * dataObjs[i].quantity;
                    updatedCartState.push({
                        sku: dataObjs[i].sku,
                        quantity: dataObjs[i].quantity,
                        shoeName: dataObjs[i].name,
                        shoePrice: dataObjs[i].price,
                    });
                }
            }
            return { ...state, cartState: updatedCartState, itemCount: currCount, subtotal: currTotal };

        case CartEventType.removeMany:
            dataObjs = action.dataObjs;

            updatedCartState = state.cartState
                .map((obj) => {
                    for (var dataObj in dataObjs) {
                        if (dataObj.sku === obj.sku) {
                            currCount = Math.max(0, currCount - dataObj.quantity);
                            currTotal = Math.max(0, currTotal - dataObj.price * dataObj.quantity);
                            return {
                                ...obj,
                                quantity: obj.quantity - dataObj.quantity,
                            };
                        }
                    }
                    return obj;
                })
                .filter((obj) => obj.quantity > 0);
            return {
                ...state,
                cartState: updatedCartState,
                itemCount: currCount,
                subtotal: currTotal,
            };

        case CartEventType.clearCart:
            return {
                ...state,
                cartState: [],
                itemCount: 0,
                subtotal: 0,
            };

        default:
            return state;
    }
}
