import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { connect } from "react-redux";

const OrderSummary = (props) => {
    const { cartState } = props;

    return (
        <Box
            sx={{
                display: "flex",
                position: "relative",
                left: 200,
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    width: 200,
                    height: 275,
                },
            }}>
            <Paper elevation={3} className="order-paper">
                {
                    <Box>
                        <List className="order-math">
                            {cartState.map((orderObj, idx) => {
                                return (
                                    <ListItem key={`order-item-${idx}`} className="order-obj">
                                        <Typography>{orderObj.shoeName}</Typography>
                                        <Typography>{orderObj.shoePrice}</Typography>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Box>
                }
            </Paper>
        </Box>
    );
};

const mapStateToProps = (state, props) => ({
    cartState: state && state.cart && state.cart.cartState,
});

export default connect(mapStateToProps, null)(OrderSummary);
