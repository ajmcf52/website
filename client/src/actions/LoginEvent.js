const LoginEventType = {
    login: "LOGIN",
    logout: "LOGOUT",
};

const LoginEventCreator = {
    login: (userInfo) => ({
        type: LoginEventType.login,
        userInfo,
    }),
    logout: () => ({
        type: LoginEventType.logout,
    }),
};

export { LoginEventType, LoginEventCreator };
