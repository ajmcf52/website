const LoginEventType = {
    login: "LOGIN",
    logout: "LOGOUT",
    updateAT: "UPDATE_AT",
};

const LoginEventCreator = {
    login: (userInfo) => ({
        type: LoginEventType.login,
        userInfo,
    }),
    logout: () => ({
        type: LoginEventType.logout,
    }),
    updateAT: (at) => ({
        type: LoginEventType.updateAT,
        accessToken: at,
    }),
};

export { LoginEventType, LoginEventCreator };
