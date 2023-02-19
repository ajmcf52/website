import React from "react";
import { connect } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ShoeEventCreator } from "../../actions/ShoeEvent";
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
    const { dialogIsOpen, closeOrderDialog } = props;
    return (
        <div>
            <Dialog open={dialogIsOpen} onClose={closeOrderDialog}>
                <DialogTitle>Order Review</DialogTitle>
                <DialogContent className="order-dialog" dividers={true}>
                    <DialogContentText>Hello World</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>Submit Order</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapDispatchToProps = {
    addToCart: CartEventCreator.addToCart,
    removeFromCart: CartEventCreator.removeFromCart,
    closeOrderDialog: DialogEventCreator.closeOrderDialog,
};

const mapStateToProps = (state, props) => ({
    cartState: state && state.cart && state.cart.cartState,
    dialogIsOpen: state && state.dialog && state.dialog.isOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDialog);
