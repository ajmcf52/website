import axios from "../../api/axios";
import { StyledButton } from "./styled/StyledButton";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { LoginEventCreator } from "../../actions/LoginEvent";

function LogoutButton(props) {
    const { triggerLogout, email } = props;
    let navigate = useNavigate();
    return (
        <StyledButton
            key="logout"
            color="primary"
            className="btn btn-logout"
            variant="contained"
            onClick={async () => {
                try {
                    await axios
                        .delete(
                            "/logout",
                            { email },
                            {
                                headers: { "Content-Type": "application/json" },
                                withCredentials: true,
                            }
                        )
                        .then((res) => {
                            console.log(JSON.stringify(res?.data));
                        });
                } catch (error) {
                    console.error(error);
                }
                triggerLogout();
                navigate("/");
            }}>
            Logout
        </StyledButton>
    );
}

const mapDispatchToProps = {
    triggerlogout: LoginEventCreator.logout,
};

const mapStateToProps = (state, props) => ({
    email: state && state.login && state.login.email,
});

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
