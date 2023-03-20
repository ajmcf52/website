import { StyledButton } from "./styled/StyledButton";
import { useNavigate } from "react-router-dom";

function BackButton(props) {
    let navigate = useNavigate();
    return (
        <StyledButton
            {...props}
            key="back"
            color="primary"
            className="btn back-btn"
            variant="contained"
            onClick={() => {
                navigate(-1);
            }}>
            {"Back <"}
        </StyledButton>
    );
}

export default BackButton;
