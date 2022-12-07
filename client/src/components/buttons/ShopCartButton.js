import React from "react";
import { StyledButton } from "./styled/StyledButton";
import { ShoppingCart } from "@mui/icons-material/ShoppingCart";
//import { useNavigate } from "react-router-dom";

class ShopCartButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemsInCart: 0,
        };
    }
    componentDidMount() {
        //let navigate = useNavigate();
        // const [cartCount, setCartCount] = useState(0);
    }
    render() {
        return (
            <StyledButton
                {...this.props}
                startIcon={<ShoppingCart />}
                key="shop-cart"
                className="btn btn-shop-cart"
                color="primary"
                variant="contained"
                onClick={() => {
                    /* TODO
                    navigate to user's shopping cart on button click. Should either be accessible
                    via 
                */
                }}>
                {this.state.itemsInCart}
            </StyledButton>
        );
    }
}

/* 
<Button variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
*/

export default ShopCartButton;
