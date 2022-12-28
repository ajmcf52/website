import { StyledButton } from "./styled/StyledButton";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LoginEventCreator } from "../../actions/LoginEvent";

function LogoutButton(props) {
    const { triggerlogout } = props;
    let navigate = useNavigate();
    return (
        <StyledButton
            key="logout"
            color="primary"
            className="btn btn-logout"
            variant="contained"
            onClick={() => {
                triggerlogout();
                navigate("/");
            }}>
            Logout
        </StyledButton>
    );
}

const mapDispatchToProps = {
    triggerlogout: LoginEventCreator.logout,
};

export default connect(null, mapDispatchToProps)(LogoutButton);
