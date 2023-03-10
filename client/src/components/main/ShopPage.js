import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { Button } from "@mui/material";
import axios from "../../api/axios";
import { NavBar } from "./LandingPage";
import { validateToken } from "../../utils/validateRefreshToken";
import { fetchCartContents } from "../../utils/fetchCartContents";
import LoginButton from "../buttons/LoginButton";
import LogoutButton from "../buttons/LogoutButton";
import SignupButton from "../buttons/SignupButton";
import ShopCartButton from "../buttons/ShopCartButton";
import OrderDialog from "./OrderDialog";
import { LoginEventCreator } from "../../actions/LoginEvent";
import { ShoeEventCreator } from "../../actions/ShoeEvent";
import { CartEventCreator } from "../../actions/CartEvent";
import "./css/ShopPage.css";

const navShopBtnTheme = createTheme({
    palette: {
        primary: {
            main: "#deceaf",
            contrastText: "#4e0954",
        },
        secondary: {
            main: "#c26dc9",
            contrastText: "#665534",
        },
    },
});

const ShopPage = (props) => {
    const navigate = useNavigate();
    const {
        accessToken,
        email,
        isLoggedIn,
        triggerLogin,
        loadShoes,
        incrementSelectedQuantity,
        decrementSelectedQuantity,
        shoeInfo,
        addToCartRdx,
        cartState,
    } = props;

    useEffect(() => {
        const getShoes = async () => {
            if (props.shoeInfo && props.shoeInfo.length > 0) return;

            await axios
                .get("/getAllShoes", {
                    params: { email, at: accessToken },
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                })
                .then((res) => {
                    console.log("response data --> ", res.data);
                    let shoeInfo = res.data.shoeInfo;
                    shoeInfo.forEach((obj) => {
                        obj.selected_quantity = 1;
                    });
                    loadShoes(shoeInfo);
                })
                .catch((error) => {
                    console.error("ERROR --> ", error.response);
                });
        };
        const initLogin = async () => {
            if (isLoggedIn) {
                await axios
                    .get("/initCart", {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true,
                    })
                    .then((res) => {})
                    .catch(async (err) => {
                        if (err.res.status === 304) {
                            // 304 --> cart already init'd (validation needed)
                            const cartContents = await fetchCartContents();
                            console.log(`shoppage cart contents --> ${cartContents}`);
                        }
                    });
                return;
            }
            await axios
                .get("/refreshToken", {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                })
                .then((res) => {
                    if (res.data.renewedAccessToken !== undefined) {
                        triggerLogin({
                            email: res.data.email,
                            fname: res.data.fname,
                            accessToken: res.data.renewedAccessToken,
                        });
                    }
                })
                .catch((err) => {
                    console.error(err.response.data);
                    //navigate("/");
                });
        };

        initLogin().then(getShoes);
    });
    const navBarButtons = isLoggedIn ? [<LogoutButton />, <ShopCartButton />] : [<LoginButton />, <SignupButton />, <ShopCartButton />];
    return (
        <div className="shop-root">
            <OrderDialog />
            <div className="shop-page"></div>
            <NavBar theme={navShopBtnTheme} buttons={navBarButtons}></NavBar>
            <header className="page-header">
                <h2 className="shop-header">Check these puppies out!</h2>
            </header>
            <div className="selection-container">
                {props.shoeInfo &&
                    props.shoeInfo.map((dataObj, index) => {
                        let imgUrl = `http://localhost:8000/${dataObj.img_url}`;
                        return (
                            <div key={`outerCtn-${index}`} className="outer-shoe-container">
                                <div key={`innerCtn-${index}`} className="inner-shoe-container">
                                    <img key={`shoePic-${index}`} className="shoe-pic" alt={dataObj.sku} src={imgUrl}></img>
                                    <div key={`shoeTxt-${index}`} className="shoe-text-container">
                                        <Typography
                                            key={`shoeName-${index}`}
                                            style={{
                                                marginLeft: "5%",
                                            }}>{`${dataObj.name}`}</Typography>
                                        <Typography key={`shoePrice-${index}`} style={{ marginRight: "5%" }}>
                                            {`$${dataObj.price}`}
                                        </Typography>
                                    </div>
                                </div>
                                <div key={`addToCart-${index}`} className="add-to-cart-row">
                                    <Typography
                                        key={`stockDisplay-${index}`}
                                        style={{
                                            color: dataObj.quantity > 0 ? "#286e02" : "#f50707",
                                            marginLeft: "2%",
                                            marginTop: "-2%",
                                            fontWeight: "bolder",
                                        }}>
                                        {dataObj.quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
                                    </Typography>
                                    <Button
                                        key={`cartAddBtn-${index}`}
                                        className="cart-add-btn"
                                        variant="contained"
                                        onClick={async () => {
                                            const getCurrCartQuantity = async (sku) => {
                                                for (var i = 0; i < cartState.length; i++) {
                                                    if (sku === cartState[i].sku) {
                                                        return cartState[i].quantity;
                                                    }
                                                }
                                                return undefined;
                                            };
                                            var currQuantity = await getCurrCartQuantity(dataObj.sku);
                                            console.log(`currQ --> ${currQuantity}`);

                                            addToCartRdx(cartState, dataObj.sku, dataObj.selected_quantity, dataObj.name, dataObj.price);

                                            var formData = new FormData();
                                            formData.append("sku", dataObj.sku);
                                            formData.append("quantityToAdd", dataObj.selected_quantity);
                                            formData.append("currQuantity", currQuantity);
                                            var config = {
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                url: "/addToCart",
                                                withCredentials: true,
                                                method: "POST",
                                                data: formData,
                                            };

                                            await axios
                                                .request(config)
                                                .then((res) => {
                                                    console.log("Cart Table updated.");
                                                })
                                                .catch((err) => {
                                                    console.error(`/addToCart (ERR): ${err.response.data.errText}`);
                                                });
                                        }}>
                                        Add to Cart
                                    </Button>
                                    <div key={`addToCart-${index}`} className="add-to-cart">
                                        <button
                                            key={`plusBtn-${index}`}
                                            className="plus-btn shop-btn"
                                            onClick={() => {
                                                incrementSelectedQuantity(shoeInfo, index);
                                            }}>
                                            {"+"}
                                        </button>
                                        <span key={`selectQuantity-${index}`} className="selected-quantity">
                                            {dataObj.selected_quantity}
                                        </span>
                                        <button
                                            key={`minusBtn-${index}`}
                                            className="minus-btn shop-btn"
                                            onClick={() => {
                                                decrementSelectedQuantity(shoeInfo, index);
                                            }}>
                                            {"-"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

const mapDispatchToProps = {
    triggerLogin: LoginEventCreator.login,
    triggerLogout: LoginEventCreator.logout,
    loadShoes: ShoeEventCreator.shoes,
    incrementSelectedQuantity: ShoeEventCreator.quantitySelectIncr,
    decrementSelectedQuantity: ShoeEventCreator.quantitySelectDecr,
    addToCartRdx: CartEventCreator.addToCart,
};
const mapStateToProps = (state, props) => ({
    isLoggedIn: state && state.login && state.login.loggedIn,
    firstName: state && state.login && state.login.fname,
    accessToken: state && state.login && state.login.accessToken,
    email: state && state.login && state.login.email,
    shoeInfo: state && state.shoe && state.shoe.shoeInfo,
    cartState: state && state.cart && state.cart.cartState,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
