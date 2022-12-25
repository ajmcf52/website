import { StyledButton } from "./styled/StyledButton";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LoginEventCreator } from "../../actions/LoginEvent";

function LogoutButton(props) {
    let navigate = useNavigate();
    return (
        <StyledButton
            {...props}
            key="logout"
            color="primary"
            className="btn btn-logout"
            variant="contained"
            onClick={() => {
                props.triggerLogout();
                navigate("/");
            }}>
            Logout
        </StyledButton>
    );
}

const mapDispatchToProps = {
    triggerLogout: LoginEventCreator.logout,
};

export default connect(null, mapDispatchToProps)(LogoutButton);
