import { Box } from "@mui/material";

const DrawerHeader = ({ children }) => {
  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: (theme) => theme.spacing(0, 1),
        minHeight: (theme) => theme.mixins.toolbar.minHeight,
      }}
    >
      {children}
    </Box>
  );
};

export default DrawerHeader;
