import { useNavigate } from "react-router-dom";
import axios from "axios";
import store from "../store";
import { LoginEventCreator } from "../actions/LoginEvent";

const triggerLogin = LoginEventCreator.login;

var instance = axios.create({
    baseURL: "http://localhost:8000/",
});

// instance.interceptors.response.use(
//     (res) => {
//         return res;
//     },
//     async (err) => {
//         if (err.response.status === 412) {
//             /**
//             412 --> missing access token. Here we have an interceptor that catches the 412,
//             and in response, calls /refreshToken to get a new access token, and finally retries
//             the original request. If any of these steps fails, we just navigate back to the home page.
//             */
//             try {
//                 await instance
//                     .get("/refreshToken", {
//                         headers: { "Content-Type": "application/json" },
//                         withCredentials: true,
//                     })
//                     .then((res) => {
//                         if (res.data.renewedAccessToken !== undefined) {
//                             store.dispatch(
//                                 triggerLogin({
//                                     email: res.data.email,
//                                     fname: res.data.fname,
//                                     accessToken: res.data.renewedAccessToken,
//                                 })
//                             );
//                         }
//                     });
//                 return instance.request(err.config);
//             } catch (error) {
//                 // if all else fails, redirect back to the login screen.
//                 //useNavigate("/");
//             }
//         }
//         return Promise.reject(err);
//     }
// );

export default instance;
