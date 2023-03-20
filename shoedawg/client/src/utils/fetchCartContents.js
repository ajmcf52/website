import axios from "../api/axios";

export const fetchCartContents = async (accessToken) => {
    console.log(`AT --> ${accessToken}`);
    await axios
        .get("/cartContents", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            params: {
                at: accessToken,
            },
        })
        .then((res) => {
            return Promise.resolve(res);
        })
        .catch((err) => {
            console.error(`ERROR (fetchCartContents) --> ${err.res.errText}`);
            return null;
        });
};
