import { connect } from "react-redux";
import { CartEventCreator } from "../../actions/CartEvent";
import "./css/ATCButton.css";

const ATCButton = (props) => {
    const { index, addToCartRdx, removeFromCart, cartState } = props;
    return (
        <div key={`addToCart-${index}`} className="add-to-cart">
            <button
                key={`plusBtn-${index}`}
                className="plus-btn shop-btn"
                onClick={() => {
                    const sku = cartState[index].sku;
                    const quantity = 1;
                    const name = cartState[index].name;
                    const price = cartState[index].price;
                    addToCartRdx(cartState, sku, quantity, name, price);
                }}>
                {"+"}
            </button>
            <span key={`selectQuantity-${index}`} className="selected-quantity">
                {cartState[index].quantity}
            </span>
            <button
                key={`minusBtn-${index}`}
                className="minus-btn shop-btn"
                onClick={() => {
                    const sku = cartState[index].sku;
                    const quantity = 1;
                    removeFromCart(cartState, sku, quantity);
                }}>
                {"-"}
            </button>
        </div>
    );
};

const mapDispatchToProps = {
    addToCartRdx: CartEventCreator.addToCart,
    removeFromCart: CartEventCreator.removeFromCart,
};

const mapStateToProps = (state) => ({
    cartState: state && state.cart && state.cart.cartState,
});

export default connect(mapStateToProps, mapDispatchToProps)(ATCButton);
