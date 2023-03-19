import React from "react";
import axios from "../../api/axios";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import OrderSummary from "./OrderSummary";
import DialogTitle from "@mui/material/DialogTitle";
import ATCButton from "../buttons/ATCButton";
import { CartEventCreator } from "../../actions/CartEvent";
import { DialogEventCreator } from "../../actions/DialogEvent";
import "./css/OrderDialog.css";

// const styles = {
//     dialogPaper: {
//         minHeight: "70vh",
//         maxHeight: "70vh",
//         minWidth: "70%",
//         maxWidth: "70%",
//     },
// };

function OrderDialog(props, { classes }) {
    const { dialogIsOpen, closeOrderDialog, cartState, removeFromCart, accessToken } = props;
    return (
        <div className="order-dialog-ctn">
            <Dialog
                className="order-dialog"
                open={dialogIsOpen}
                onClose={closeOrderDialog}
                aria-labelledby="modal-title"
                aria-describedby="order-dialog">
                <DialogTitle className="dialog-title">Order Review</DialogTitle>
                <DialogContent className="dialog-content" dividers={true}>
                    {/**
                    hint: stick a div in here with "display: grid" to hold the order contents
                    you can also use another grid for the order summary math in the bottom-right

                     */}

                    {
                        // NOTE: inject grid style using withStyles
                        // to set the row count.
                    }
                    <div className="order-item-grid">
                        {cartState.map((orderObj, idx, A) => {
                            // const selectionQuantity = A.length;
                            console.log(JSON.stringify(orderObj));
                            return (
                                <div key={`orderObj-row-${idx}`}>
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "3fr 1fr 24% 1fr 2fr 1fr",
                                            gridTemplateRows: "1fr",
                                            //textAlign: "center",
                                            alignItems: "center",
                                            justifyItems: "center",
                                        }}>
                                        <span className="item item-name grid-item">{orderObj.shoeName}</span>

                                        <span className="item item-sku grid-item">{`(${orderObj.sku})`}</span>
                                        <span> </span>
                                        <span className="item item-price grid-item">{orderObj.shoePrice}</span>
                                        <ATCButton index={idx} className="grid-item atc-button" />
                                        <IconButton
                                            onClick={async () => {
                                                await axios
                                                    .delete("/clearCartSelection", {
                                                        headers: { "Content-Type": "application/json" },
                                                        withCredentials: true,
                                                        params: { at: accessToken, sku: orderObj.sku },
                                                    })
                                                    .then((res) => {
                                                        removeFromCart(cartState, orderObj.sku, orderObj.quantity, orderObj.shoePrice);
                                                        console.log(`selection ${orderObj.sku} cleared from cart`);
                                                    })
                                                    .catch((err) => {
                                                        console.error(`ERROR (clearCartSelection) --> ${JSON.stringify(err)}`);
                                                    });
                                            }}>
                                            <ClearIcon />
                                        </IconButton>
                                    </Box>
                                </div>
                            );
                        })}
                    </div>
                    <OrderSummary className="order-summary" />
                </DialogContent>
                <DialogActions>
                    <Button className="submit-order-button">Submit Order</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = {
    addToCart: CartEventCreator.addToCart,
    removeFromCart: CartEventCreator.removeFromCart,
    closeOrderDialog: DialogEventCreator.closeOrderDialog,
    clearCart: CartEventCreator.clearCart,
};

const mapStateToProps = (state, props) => ({
    cartState: state && state.cart && state.cart.cartState,
    dialogIsOpen: state && state.dialog && state.dialog.isOpen,
    accessToken: state && state.login && state.login.accessToken,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDialog);
