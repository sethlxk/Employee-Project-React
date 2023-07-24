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
    navigate(-1)
  }
  return (
    <div>
    {location.pathname == '/home' ? 
    (<Button
      variant="contained"
      color="success"
      startIcon={<AddCircleIcon />}
      onClick={handleAddEmployee}
      sx={{margin:'0.5rem'}}
    >
      Add Employee
    </Button>) : (<Button
      variant="contained"
      color="success"
      startIcon={<HomeIcon />}
      onClick={handleBackButton}
      sx={{margin:'0.5rem'}}
    >
      Back
    </Button>)
    }
    </div>
  );
};

export default AddEmployeeButton;
