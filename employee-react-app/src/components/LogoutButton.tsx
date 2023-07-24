import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <Button
        variant="contained"
        color="success"
        startIcon={<LogoutIcon />}
        onClick={handleLogOut}
      >
        Log Out
      </Button>
    </div>
  );
};

export default LogoutButton;
