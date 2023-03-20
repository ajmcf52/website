import { StyledButton } from "./styled/StyledButton";
import { useNavigate } from "react-router-dom";

export default function LoginButton(props) {
    let navigate = useNavigate();
    return (
        <StyledButton
            {...props}
            key="login"
            color="primary"
            className="btn btn-login"
            variant="contained"
            onClick={() => {
                navigate("/login");
            }}>
            Login
        </StyledButton>
    );
}
