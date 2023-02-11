const ShoeEventType = {
    shoes: "SHOES",
    quantitySelectIncr: "QUANTITY_SELECT_INCR",
    quantitySelectDecr: "QUANTITY_SELECT_DECR",
};

const ShoeEventCreator = {
    shoes: (shoeInfo) => ({
        type: ShoeEventType.shoes,
        shoeInfo,
    }),
    quantitySelectIncr: (shoeInfo, idx) => ({
        type: ShoeEventType.quantitySelectIncr,
        shoeInfo,
        idx,
    }),
    quantitySelectDecr: (shoeInfo, idx) => ({
        type: ShoeEventType.quantitySelectDecr,
        shoeInfo,
        idx,
    }),
};

export { ShoeEventType, ShoeEventCreator };
