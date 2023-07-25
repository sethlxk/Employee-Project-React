import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  TextField,
} from "@mui/material";
import { MouseEventHandler, useEffect, useState } from "react";
import { Department } from "../models/employee.model";
import { createEmployee, editEmployee } from "../store/features/employeeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch} from "../store/store";
import { validateName, validateSalary } from "../utils/employeeValidation";

const EmployeeForm = () => {
  const [name, setName] = useState<string>("");
  const [salaryString, setSalary] = useState<string>("");
  const [department, setDepartment] = useState<Department>(Department.PS);
  const [nameError, setNameError] = useState<string>("");
  const [salaryError, setSalaryError] = useState<string>("");
  const [isEditErrorDialogOpen, setEditErrorDialog] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const lstoken = localStorage.getItem("token");
  useEffect(() => {
    if (!lstoken) {
      navigate("/");
    }
  });
  useEffect(() => {
    if (location.pathname === "/edit-employee" && lstoken) {
      setName(location.state.employee.name.trim());
      setSalary(location.state.employee.salary as unknown as string);
      setDepartment(location.state.employee.department);
    }
  }, []);

  const handleEditButton: MouseEventHandler = async (e) => {
    e.preventDefault();

    if (
      name.trim() == location.state.employee.name &&
      salaryString == location.state.employee.salary.toString() &&
      department == location.state.employee.department
    ) {
      setName(name.trim());
      setEditErrorDialog(true);
      return;
    }

    let { isValid: isNameValid, errorMessage: nameErrorMessage } =
      validateName(name);
    let { isValid: isSalaryValid, errorMessage: salaryErrorMessage } =
      validateSalary(salaryString);

    setNameError(nameErrorMessage);

    setSalaryError(salaryErrorMessage);
    if (isNameValid && isSalaryValid && lstoken) {
      try {
        const salary = +salaryString;
        const id = location.state.employee.id;
        const employee = { id, name, salary, department, token:lstoken };
        await dispatch(editEmployee(employee)).unwrap();
        setName("");
        setSalary("");
        setDepartment(Department.PS);
        navigate("/home");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEditDialogClose = () => {
    setEditErrorDialog(false);
  };

  const handleAddButton: MouseEventHandler = async (e) => {
    e.preventDefault();
    let { isValid: isNameValid, errorMessage: nameErrorMessage } =
      validateName(name);
    let { isValid: isSalaryValid, errorMessage: salaryErrorMessage } =
      validateSalary(salaryString);

    setNameError(nameErrorMessage);

    setSalaryError(salaryErrorMessage);

    if (isNameValid && isSalaryValid && lstoken) {
      try {
        const salary = +salaryString;
        const employee = { name: name.trim(), salary, department, token: lstoken };
        await dispatch(createEmployee(employee)).unwrap();
        setName("");
        setSalary("");
        setDepartment(Department.PS);
        navigate("/home", { state: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      sx={{
        width: "auto",
        height: "40rem",
        boxShadow: 2,
        borderRadius: 2,
        backgroundColor: "grey.100",
        padding: "2rem",
      }}
    >
      {location.pathname === "/add-employee" && (
        <h1>Enter new employee details</h1>
      )}
      {location.pathname === "/edit-employee" && (
        <h1>Edit the employee details</h1>
      )}
      <form>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ width: "20rem", margin: "20px" }}
          required
          size="small"
          error={!!nameError}
          helperText={nameError}
        />

        <br />
        <TextField
          label="Salary"
          variant="outlined"
          value={salaryString}
          onChange={(e) => setSalary(e.target.value)}
          sx={{ width: "20rem", margin: "20px" }}
          required
          size="small"
          error={!!salaryError}
          helperText={salaryError}
        />
        <br />
        <TextField
          label="Department"
          variant="outlined"
          value={department}
          onChange={(e) => setDepartment(e.target.value as Department)}
          sx={{ width: "20rem", margin: "20px" }}
          select
          required
          size="small"
        >
          {Object.values(Department).map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <br />
        {location.pathname === "/add-employee" && (
          <Button
            variant="contained"
            type="submit"
            sx={{ margin: "4rem" }}
            onClick={handleAddButton}
            size="large"
          >
            Add
          </Button>
        )}
        {location.pathname === "/edit-employee" && (
          <Button
            variant="contained"
            type="submit"
            sx={{ margin: "4rem" }}
            onClick={handleEditButton}
            size="large"
          >
            Update
          </Button>
        )}
        <Dialog
          open={isEditErrorDialogOpen}
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please ensure you have changed a field
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditDialogClose}>Okay</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Box>
  );
};

export default EmployeeForm;
