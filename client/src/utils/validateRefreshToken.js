import axios from "../../api/axios";

export const validateToken = async (triggerLoginFn, isLoggedIn) => {
    try {
        await axios
            .get("/refreshToken", {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            })
            .then((res) => {
                console.log(res.data);
                console.log(res.data.renewedAccessToken);
                if (res.data.renewedAccessToken !== undefined) {
                    triggerLoginFn({
                        email: res.data.email,
                        fname: res.data.fname,
                        accessToken: res.data.renewedAccessToken,
                    });
                }
            });
    } catch (error) {
        if (!isLoggedIn) {
            // we only care to see this if we haven't already validated.
            console.error(error.response.data);
        }
    }
};
