import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import { Employee } from "../models/employee.model";
import { useAppDispatch } from "../store/store";
import { deleteEmployee, fetchAllEmployees } from "../store/features/employeeSlice";
import { useState } from "react";
interface Props {
  employee: Employee;
}
const DeleteEmployeeButton = ({ employee }: Props) => {
  const dispatch = useAppDispatch();
  const [isDeleteDialogOpen, setDeleteDialog] = useState<boolean>(false);
  const handleDeleteButton = () => {
    setDeleteDialog(true);
  };

  const handleDeleteDialogCloseDelete = async () => {
    try {
      await dispatch(deleteEmployee(employee.id)).unwrap();
      setDeleteDialog(false);
      await dispatch(fetchAllEmployees()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteDialogCloseCancel = () => {
    setDeleteDialog(false);
  };

  return (
    <div>
      <IconButton sx={{ color: "red" }} onClick={handleDeleteButton}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={isDeleteDialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You will permanently remove this employee
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogCloseCancel}>Cancel</Button>
          <Button onClick={handleDeleteDialogCloseDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteEmployeeButton;
