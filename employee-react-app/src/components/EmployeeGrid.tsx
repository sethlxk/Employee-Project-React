import {
  Box,
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
import { useEffect } from "react";
import { Employee } from "../models/employee.model";
import "../App.css";
import Pagination from "./Pagination";
import { paginationActions } from "../store/features/paginationSlice";
const EmployeeGrid = () => {
  let currentPage = useAppSelector(
    (state) => state.PaginationSlice.currentPage
  );
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
  useEffect(() => {
    if (pagedEmployees.length == 0 && currentPage != 1) {
      dispatch(paginationActions.setCurrentPage({ currentPage: 1 }));
    }
  }, [pagedEmployees]);
  const handlePageChange = (page: number) => {
    dispatch(paginationActions.setCurrentPage({ currentPage: page }));
  };
  return (
      <Box>
        <Grid
          margin={"0"}
          container
          spacing={8}
          width="100%"
          gap="20px"
          justifyContent="center"
        >
          {pagedEmployees.map((employee) => (
            <Grid
              item
              className="grid-item"
              xs={12}
              sm={12}
              md={5}
              lg={5}
              xl={5}
              key={employee.id}
              width="100%"
              sx={{ display: "flex", justifyContent: "center" }}
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
                        sx={{
                          color: "darkblue",
                          textAlign: "left",
                          fontWeight: "bold",
                        }}
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
          <div className="page-entries">
            Showing {startIndex + 1}-{Math.min(endIndex, employees.length)} out
            of {employees.length} entries
          </div>
          <Pagination
            totalPages={Math.ceil(employees.length / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </Box>
  );
};

export default EmployeeGrid;
