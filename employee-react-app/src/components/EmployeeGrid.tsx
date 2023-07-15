import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import EditEmployeeButton from "./EditEmployeeButton";
import DeleteEmployeeButton from "./DeleteEmployeeButton";
import { useAppDispatch, useAppSelector } from "../store/store";
import { fetchAllEmployees } from "../store/features/employeeSlice";
import { useEffect, useState } from "react";
import { Employee } from "../models/employee.model";
import "../App.css";
import Pagination from "./Pagination";
const EmployeeGrid = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployees()).unwrap();
  }, []);
  let employees = useAppSelector((state) => state.EmployeeSlice.employees);

  const sortedEmployees = [...employees];
  sortedEmployees.sort((a: Employee, b: Employee) => a.id - b.id);
  employees = sortedEmployees;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pagedEmployees = employees.slice(startIndex, endIndex);
  // useEffect(() => {
  //   const startIndex = (currentPage - 1) * itemsPerPage;
  //   const endIndex = startIndex + itemsPerPage;
  //   const pagedEmployees = employees.slice(startIndex, endIndex);
  // },[currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <Grid className="grid" container spacing={8}>
        {pagedEmployees.map((employee) => (
          <Grid
            item
            className="grid-item"
            xs={12}
            sm={6}
            md={6}
            lg={6}
            xl={6}
            key={employee.id}
          >
            <Card
              className="card"
              variant="outlined"
              sx={{ backgroundColor: "grey.200" }}
            >
              <CardContent className="card-content">
                <Grid container alignItems="center" spacing={1}>
                  <Grid item xs={9}>
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ color: "darkblue", textAlign: "left" }}
                    >
                      {employee.name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{ color: "darkblue", textAlign: "left" }}
                    >
                      {employee.department}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      sx={{ color: "darkblue", textAlign: "left" }}
                    >
                      ${employee.salary}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <CardActions>
                      <EditEmployeeButton employee={employee} />
                      <DeleteEmployeeButton employee={employee} />
                    </CardActions>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div className="pagination">
        <div className="test">
        Showing {startIndex + 1}-{Math.min(endIndex, employees.length)} out of{" "}
        {employees.length} entries
        </div>
        <Pagination
          totalPages={Math.ceil(employees.length / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default EmployeeGrid;
