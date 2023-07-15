import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

const AddEmployeeButton = () => {
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate("/add-employee");
  };

  const handleBackButton = () => {
    navigate("/")
  }
  return (
    <div>
    {location.pathname == '/' ? 
    (<Button
      variant="contained"
      color="success"
      startIcon={<AddCircleIcon />}
      onClick={handleAddEmployee}
    >
      Add Employee
    </Button>) : (<Button
      variant="contained"
      color="success"
      startIcon={<HomeIcon />}
      onClick={handleBackButton}
    >
      Return Home
    </Button>)
    }
    </div>
  );
};

export default AddEmployeeButton;
