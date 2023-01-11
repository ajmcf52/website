const TokenEventType = {
    newToken: "NEW_TOKEN",
    tokenRevoked: "TOKEN_REVOKED",
};

const TokenEventCreator = {
    newToken: (accessToken) => ({
        type: TokenEventType.newToken,
        accessToken,
    }),
    tokenRevoked: () => ({
        type: TokenEventType.tokenRevoked,
    }),
};

export { TokenEventCreator, TokenEventType };
