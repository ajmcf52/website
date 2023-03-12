import axios from "axios";
import store from "../store";
import { LoginEventCreator } from "../actions/LoginEvent";

const triggerLogin = LoginEventCreator.login;

var instance = axios.create({
    baseURL: "http://localhost:8000/",
});

const storeFunc = LoginEventCreator.updateAT;

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const req = err.config;
        /**
        449 --> missing access token
        */
        if (err.response.status === 449 && !req.retry) {
            req.retry = true;
            await instance
                .get("/refreshToken", {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.data.renewedAccessToken !== undefined) {
                        store.dispatch(storeFunc(res.data.renewedAccessToken));
                    }
                })
                .catch((err) => {
                    console.log(`Interceptor failed: ${err}`);
                });
        }
        return Promise.reject(err);
    }
);

export default instance;
