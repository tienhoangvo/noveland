// react
import { useState } from "react";

// mui components
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Toolip from "@mui/material/Tooltip";

// mui icons
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

// custom
import DrawerHeader from "../../components/DrawerHeader/DrawerHeader";
import Sidenav from "../../components/Sidenav/Sidenav";
import useCurrentUser from "../../hooks/useCurrentUser";
import IconButtonWithToolip from "../../components/mui-custom/IconButtonWithToolip/IconButtonWithToolip";

// MainLayout component START
const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  const { currentUser, loading } = useCurrentUser();

  const toggleMiniSidenav = () => setOpen(!open);
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <AppBar
        poisition="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <DrawerHeader>
          <IconButtonWithToolip onClick={toggleMiniSidenav} color="inherit">
            <MenuIcon />
          </IconButtonWithToolip>

          <TextField
            label="Search"
            size="small"
            variant="filled"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),

              sx: {
                color: "inherit",
                borderColor: "inherit",
                "&:focus": { color: "inherit" },
              },
            }}
            InputLabelProps={{
              sx: {
                color: "inherit",
                "&:focus": { color: "inherit" },
              },
            }}
          />

          <Stack direction="row" spacing={2} alignItems="center">
            {currentUser && (
              <>
                <IconButtonWithToolip title="Write">
                  <CreateIcon />
                </IconButtonWithToolip>

                <IconButtonWithToolip title="Notifications">
                  <NotificationsIcon />
                </IconButtonWithToolip>
                <IconButtonWithToolip color="inherit">
                  <Avatar
                    src={currentUser.picture || "#"}
                    alt={currentUser.name}
                    sx={{ height: 32, width: 32 }}
                  />
                </IconButtonWithToolip>
              </>
            )}

            {!currentUser && (
              <>
                <IconButtonWithToolip>
                  <MoreVertIcon />
                </IconButtonWithToolip>
                <Button
                  startIcon={<AccountCircleIcon />}
                  variant="outlined"
                  color="inherit"
                >
                  Sign in
                </Button>{" "}
              </>
            )}
          </Stack>
        </DrawerHeader>
      </AppBar>
      <Sidenav open={open} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
