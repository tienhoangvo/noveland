import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: "light",
    google: "#dd4b39",
    facebook: "#3b5998",
    twitter: "#00aced",
  },
});

export default theme;
