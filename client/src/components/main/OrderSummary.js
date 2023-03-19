import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { List, Divider } from "@mui/material";
import { styled } from "@mui/system";
import { connect } from "react-redux";

const DescriptorText = styled("p")({
    fontSize: 15,
    position: "relative",
    left: "4%",
    marginTop: "2%",
    marginBottom: "2%",
    maxHeight: "1em",
});
const PriceText = styled("p")({
    fontSize: 15,
    fontFamily: "Archivo",
    position: "relative",
    right: "4%",
    marginTop: "2%",
    marginBottom: "2%",
    maxHeight: "1em",
});

const FlexedItem = styled("li")({
    display: "flex",
    justifyContent: "space-between",
});

const OrderSummary = (props) => {
    const { cartState, subTotal } = props;

    const shipCost = (subTotal * 0.1).toFixed(2);
    const taxCost = ((subTotal + Number(shipCost)) * 0.08).toFixed(2);
    const totalCost = (subTotal + Number(shipCost) + Number(taxCost)).toFixed(2);

    return (
        <Box
            sx={{
                display: "flex",
                position: "relative",
                flexWrap: "wrap",
                "& > :not(style)": {
                    m: 1,
                    width: 200,
                    height: 275,
                },
                float: "right",
            }}>
            <Paper elevation={3} className="order-paper">
                {
                    <Box>
                        <List className="order-math">
                            {cartState.map((orderObj, idx) => {
                                return (
                                    <FlexedItem key={`order-item-${idx}`} className="order-obj">
                                        <DescriptorText>{orderObj.shoeName}</DescriptorText>
                                        <PriceText>{`$${orderObj.shoePrice}`}</PriceText>
                                    </FlexedItem>
                                );
                            })}
                        </List>
                        <Divider />
                        <List>
                            <FlexedItem>
                                <DescriptorText>{"Shipping (10%)"}</DescriptorText>
                                <PriceText>{`$${shipCost}`}</PriceText>
                            </FlexedItem>
                            <FlexedItem>
                                <DescriptorText>{"Sales Tax (8%)"}</DescriptorText>
                                <PriceText>{`$${taxCost}`}</PriceText>
                            </FlexedItem>
                        </List>
                        <Divider />
                        <List>
                            <FlexedItem>
                                <DescriptorText>{"Total"}</DescriptorText>
                                <PriceText>{`$${totalCost}`}</PriceText>
                            </FlexedItem>
                        </List>
                    </Box>
                }
            </Paper>
        </Box>
    );
};

const mapStateToProps = (state, props) => ({
    cartState: state && state.cart && state.cart.cartState,
    subTotal: state && state.cart && state.cart.subtotal,
});

export default connect(mapStateToProps, null)(OrderSummary);
