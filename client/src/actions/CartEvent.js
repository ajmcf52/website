const CartEventType = {
    addToCart: "ADD_TO_CART",
    removeFromCart: "REMOVE_FROM_CART",
};

const CartEventCreator = {
    addToCart: (cartState, skuAdded, numAdded) => ({
        type: CartEventType.addToCart,
        cartState,
        skuAdded,
        numAdded,
    }),
    removeFromCart: (cartState, skuRemoved, numRemoved) => ({
        type: CartEventType.removeFromCart,
        cartState,
        skuRemoved,
        numRemoved,
    }),
};

export { CartEventType, CartEventCreator };
