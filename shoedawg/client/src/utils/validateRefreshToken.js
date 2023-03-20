import axios from "../api/axios";

export const validateToken = async (triggerLoginFn, isLoggedIn) => {
    try {
        await axios
            .get("/refreshToken", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((res) => {
                if (res.data.renewedAccessToken !== undefined) {
                    triggerLoginFn({
                        email: res.data.email,
                        fname: res.data.fname,
                        accessToken: res.data.renewedAccessToken,
                    });
                } else {
                    console.error("(validateRefreshToken): Login Fn Failed!");
                }
            });
    } catch (error) {
        if (!isLoggedIn) {
            // we only care to see this if we haven't already validated.
            console.error(error.response.data);
        }
    }
};
