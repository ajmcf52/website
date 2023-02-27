import axios from "../api/axios";

export const fetchCartContents = async () => {
    await axios
        .get("/validateCart", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })
        .then((res) => {
            console.log(`cart contents: ${res.cartContents}`);
            return res.cartContents;
        })
        .catch((err) => {
            console.error(`ERROR (fetchCartContents) --> ${err.res.errText}`);
            return null;
        });
};
