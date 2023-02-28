const CartEventType = {
    addToCart: "ADD_TO_CART",
    addMany: "ADD_MANY",
    removeFromCart: "REMOVE_FROM_CART",
    removeMany: "REMOVE_MANY",
    clearCart: "CLEAR_CART",
};

const CartEventCreator = {
    addToCart: (cartState, skuAdded, numAdded) => ({
        type: CartEventType.addToCart,
        cartState,
        skuAdded,
        numAdded,
    }),
    addMany: (cartState, dataObjs) => ({
        type: CartEventType.addMany,
        cartState,
        dataObjs,
    }),
    removeMany: (cartState, dataObjs) => ({
        type: CartEventType.removeMany,
        cartState,
        dataObjs,
    }),
    removeFromCart: (cartState, skuRemoved, numRemoved) => ({
        type: CartEventType.removeFromCart,
        cartState,
        skuRemoved,
        numRemoved,
    }),
    clearCart: (cartState) => ({
        type: CartEventType.clearCart,
        cartState,
    }),
};

export { CartEventType, CartEventCreator };
