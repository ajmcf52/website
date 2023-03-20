const DialogEventType = {
    openOrderDialog: "OPEN_ORDER_DIALOG",
    closeOrderDialog: "CLOSE_ORDER_DIALOG",
};

const DialogEventCreator = {
    openOrderDialog: () => ({
        type: DialogEventType.openOrderDialog,
    }),
    closeOrderDialog: () => ({
        type: DialogEventType.closeOrderDialog,
    }),
};

export { DialogEventType, DialogEventCreator };
