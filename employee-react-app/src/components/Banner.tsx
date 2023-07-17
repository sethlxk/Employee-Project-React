
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import AddEmployeeButton from "./AddEmployeeButton";

// }
const Banner = () => {
  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar className='appbar' sx={{bgcolor:"darkblue"}}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left", fontSize: "30px" }}
          >
            Employees
          </Typography>
          <AddEmployeeButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Banner;
