import React from "react";
import { connect } from "react-redux";
import { DialogEventCreator } from "../../actions/DialogEvent";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//import { useNavigate } from "react-router-dom";

import { StyledButton } from "./styled/StyledButton";
class ShopCartButton extends React.Component {
    componentDidMount() {
        //let navigate = useNavigate();
        // const [cartCount, setCartCount] = useState(0);
    }
    render() {
        return (
            <StyledButton
                startIcon={<ShoppingCartIcon />}
                key="shop-cart"
                className="btn btn-shop-cart"
                color="primary"
                variant="contained"
                onClick={() => {
                    this.props.openOrderDialog();
                }}>
                {this.props.numcartitems}
            </StyledButton>
        );
    }
}

const mapDispatchToProps = {
    openOrderDialog: DialogEventCreator.openOrderDialog,
};

const mapStateToProps = (state, props) => ({
    numcartitems: state && state.cart && state.cart.itemCount,
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopCartButton);
