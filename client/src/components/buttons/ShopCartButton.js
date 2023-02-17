import React from "react";
import { connect } from "react-redux";
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
                {...this.props}
                startIcon={<ShoppingCartIcon />}
                key="shop-cart"
                className="btn btn-shop-cart"
                color="primary"
                variant="contained"
                // onClick={() => {
                //     /* TODO
                //     navigate to user's shopping cart on button click. Should either be accessible
                //     via
                // */
                // }}
            >
                {this.props.numcartitems}
            </StyledButton>
        );
    }
}

const mapStateToProps = (state, props) => ({
    numcartitems: state && state.cart && state.cart.itemCount,
});

export default connect(mapStateToProps, null)(ShopCartButton);
