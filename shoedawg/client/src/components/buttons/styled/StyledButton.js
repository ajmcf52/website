import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const StyledButton = styled(Button)(({ theme }) => ({
    maxHeight: "35px",
    border: "1px solid #8a7169",
    fontFamily: "Bebas Neue",

    "&.Mui-active": {
        color: theme.palette.secondary.main,
    },
}));
