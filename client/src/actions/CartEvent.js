const CartEventType = {
    addToCart: "ADD_TO_CART",
    addMany: "ADD_MANY",
    removeFromCart: "REMOVE_FROM_CART",
    removeMany: "REMOVE_MANY",
    clearCart: "CLEAR_CART",
};

const CartEventCreator = {
    addToCart: (cartState, sku, quantity, name, price) => ({
        type: CartEventType.addToCart,
        cartState,
        sku,
        quantity,
        name,
        price,
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
    removeFromCart: (cartState, sku, quantity) => ({
        type: CartEventType.removeFromCart,
        cartState,
        sku,
        quantity,
    }),
    clearCart: (cartState) => ({
        type: CartEventType.clearCart,
        cartState,
    }),
};

export { CartEventType, CartEventCreator };
