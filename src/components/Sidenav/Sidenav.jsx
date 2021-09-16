// mui components
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

// mui icons
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import BadgeIcon from "@mui/icons-material/Badge";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import PersonPinIcon from "@mui/icons-material/PersonPin";

// custom
import useActivePath from "../../hooks/useActivePath";
import DrawerHeader from "../DrawerHeader/DrawerHeader";
import Link from "./../Link/Link";

const drawerWidth = 240;
const Sidenav = ({ open }) => {
  const app_routes = [
    { text: "Home", icon: <HomeIcon />, href: "/" },
    {
      text: "Explore",
      icon: <ExploreIcon />,
      href: "/author",
    },
    {
      text: "What's hot",
      icon: <WhatshotIcon />,
      href: "/trending",
    },
    {
      text: "Author",
      icon: <PersonPinIcon />,
      href: "/author",
    },
  ];

  const auth_routes = [
    {
      text: "Join",
      icon: <BadgeIcon />,
      href: "/login",
    },
  ];

  const activePath = useActivePath({});

  return (
    <Drawer
      sx={{
        width: open ? drawerWidth : 80,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: open ? drawerWidth : 80,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
    >
      <DrawerHeader />

      <Box sx={{ overflow: "auto" }}>
        {open && (
          <>
            <List>
              {app_routes.map(({ text, icon, href }) => (
                <ListItemButton
                  key={text}
                  selected={activePath === href}
                  component={Link}
                  href={href}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      sx: { fontSize: "0.875rem" },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
            <Divider />

            <List>
              {auth_routes.map(({ text, icon, href }) => (
                <ListItemButton
                  key={text}
                  selected={activePath === href}
                  component={Link}
                  href={href}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      sx: { fontSize: "0.875rem" },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </>
        )}

        {!open && (
          <>
            <List disablePadding>
              {app_routes.map(({ text, icon, href }) => (
                <ListItemButton
                  key={text}
                  sx={{ flexDirection: "column", pt: 2, pb: 2 }}
                  selected={activePath === href}
                  component={Link}
                  href={href}
                >
                  <ListItemIcon sx={{ minWidth: "auto" }}>{icon}</ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: ".6rem",
                        textAlign: "center",
                        fontWeight: 400,
                      },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>

            <Divider />

            <List disablePadding>
              {auth_routes.map(({ text, icon, href }) => (
                <ListItemButton
                  key={text}
                  sx={{ flexDirection: "column", pt: 2, pb: 2 }}
                  selected={activePath === href}
                  component={Link}
                  href={href}
                >
                  <ListItemIcon sx={{ minWidth: "auto" }}>{icon}</ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={{
                      sx: {
                        fontSize: ".6rem",
                        textAlign: "center",
                        fontWeight: 400,
                      },
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default Sidenav;
