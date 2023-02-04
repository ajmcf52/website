const ShoeEventType = {
    shoes: "SHOES",
};

const ShoeEventCreator = {
    shoes: (shoeInfo) => ({
        type: ShoeEventType.shoes,
        shoeInfo,
    }),
};

export { ShoeEventType, ShoeEventCreator };
