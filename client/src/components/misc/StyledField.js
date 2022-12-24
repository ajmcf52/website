import { alpha, styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const StyledField = styled(
    (
        props //TextFieldProps
    ) => <TextField {...props} />
)(({ theme }) => ({
    fontSize: "15px",
    maxHeight: "20px",
    "& .MuiFilledInput-root": {
        border: "1px solid #d6d6ce",
        overflow: "hidden",
        borderRadius: 4,
        backgroundColor: "#2b2b2b",
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        "&:hover": {
            backgroundColor: "transparent",
        },
        "&.Mui-focused": {
            backgroundColor: "transparent",
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
            borderColor: "#a80ca6",
        },
    },
}));
