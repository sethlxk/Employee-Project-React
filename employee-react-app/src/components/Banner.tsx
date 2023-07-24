import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import AddEmployeeButton from "./AddEmployeeButton";
import { useLocation } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const Banner = () => {
  const location = useLocation();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className="appbar" sx={{ bgcolor: "darkblue" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left", fontSize: "30px" }}
          >
            Employees
          </Typography>
          {location.pathname != "/" && <AddEmployeeButton/>}
          {(location.pathname != "/" && <LogoutButton />) &&
            (location.pathname != "/register" && <LogoutButton />)}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Banner;
