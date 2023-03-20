const ErrorEventType = {
    refreshTokenExpiry: "TOKEN_EXPIRED",
};

const ErrorEventCreator = {
    refreshTokenExpired: () => ({
        type: ErrorEventType.refreshTokenExpiry,
    }),
};

export { ErrorEventCreator, ErrorEventType };
