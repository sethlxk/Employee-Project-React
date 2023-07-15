import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Employee } from "../models/employee.model";

interface Props {
  employee: Employee
}

const EditEmployeeButton = ({employee}:Props) => {
  const navigate = useNavigate();

  const handleEditEmployee = () => {
    navigate("/edit-employee", {state: {employee}});
  };

  
  
  return (
    <IconButton sx={{ color: "orange" }} onClick={handleEditEmployee}>
      <EditIcon />
    </IconButton>
  );
};

export default EditEmployeeButton;