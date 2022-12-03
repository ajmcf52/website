import { StyledButton } from "./StyledButton";
import { useNavigate } from "react-router-dom";

export default function SignupButton(props) {
    let navigate = useNavigate();
    return (
        <StyledButton
            {...props}
            key="signup"
            className="btn btn-signup"
            color="primary"
            variant="contained"
            onClick={() => {
                navigate("/signup");
            }}>
            Register
        </StyledButton>
    );
}
