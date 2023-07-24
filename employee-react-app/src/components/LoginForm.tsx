import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Link,
  MenuItem,
} from "@mui/material";
import { MouseEventHandler, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/store";
import { createUser, getAllUsers} from "../store/features/userSlice";
import { useNavigate } from "react-router-dom";
import {
  validateConfirmPassword,
  validateDepartment,
  validatePassword,
  validateUsername,
} from "../utils/userValidation";
import bcryptjs from "bcryptjs";
import { getToken } from "../store/features/tokenSlice";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [departmentError, setDepartmentError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const departments = ["Admin", "PS", "HR"];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllUsers()).unwrap();
  }, []);
  let users = useAppSelector((state) => state.UserSlice.users);
  const handleLoginButton: MouseEventHandler = async (e) => {
    e.preventDefault();
    const user = users.find((user) => user.username === username);
    if (user) {
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      if (isPasswordCorrect) {
        try {
          const userDetails = { username, password };
          await dispatch(getToken(userDetails)).unwrap();
          setUsername("");
          setPassword("");
          navigate("/home");
        } catch (error) {
          console.log(error);
        }
      }
      else{
        setUsernameError("Either username or password is incorrect");
        setPasswordError("Either username or password is incorrect");
      } 
    }
    else{
        setUsernameError("Either username or password is incorrect");
        setPasswordError("Either username or password is incorrect");
    }
  };
  const handleRegisterButton: MouseEventHandler = async (e) => {
    e.preventDefault();
    let { isValid: isUsernameValid, errorMessage: usernameErrorMessage } =
      validateUsername(username);
    let { isValid: isPasswordValid, errorMessage: passwordErrorMessage } =
      validatePassword(password);
    let {
      isValid: isConfirmPasswordValid,
      errorMessage: confirmPasswordErrorMessage,
    } = validateConfirmPassword(confirmPassword, password);
    let { isValid: isDepartmentValid, errorMessage: departmentErrorMessage } =
      validateDepartment(department);

    setUsernameError(usernameErrorMessage);
    setPasswordError(passwordErrorMessage);
    setConfirmPasswordError(confirmPasswordErrorMessage);
    setDepartmentError(departmentErrorMessage);

    if (isPasswordValid && isUsernameValid && isConfirmPasswordValid && isDepartmentValid) {
      try {
        if (users.find((user) => user.username === username)) {
          setUsernameError(
            "Username already exists. Please enter a different username"
          );
          return;
        }
        const departmentId = departments.indexOf(department) + 1;

        await dispatch(
          createUser({ username, departmentId, password, confirmPassword })
        ).unwrap();
        setUsername("");
        setDepartment("");
        setPassword("");
        setConfirmPassword("");
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
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
        <h1>Welcome To Mavericks</h1>
        <form>
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ width: "20rem", margin: "20px" }}
            required
            size="small"
            error={!!usernameError}
            helperText={usernameError}
          />
          <br />
          {location.pathname === "/register" && (
            <TextField
              label="Department"
              variant="outlined"
              select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              sx={{ width: "20rem", margin: "20px" }}
              required
              size="small"
              error={!!departmentError}
              helperText={departmentError}
            >
              {departments.map((department) => (
                <MenuItem key={department} value={department}>
                  {department}
                </MenuItem>
              ))}
            </TextField>
          )}
          <br />
          <TextField
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ width: "20rem", margin: "20px" }}
            required
            size="small"
            error={!!passwordError}
            helperText={passwordError}
          />
          <br />
          {location.pathname === "/register" && (
            <TextField
              label="Confirm Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ width: "20rem", margin: "20px" }}
              required
              size="small"
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
          )}
          <br />
          {location.pathname === "/" && (
            <Button
              variant="contained"
              type="submit"
              sx={{ margin: "4rem" }}
              onClick={handleLoginButton}
              size="large"
            >
              Login
            </Button>
          )}
          {location.pathname === "/register" && (
            <Button
              variant="contained"
              type="submit"
              sx={{ margin: "4rem" }}
              onClick={handleRegisterButton}
              size="large"
            >
              Register
            </Button>
          )}
          <br />
          {location.pathname === "/" && (
            <Link href="/register" underline="hover">
              {"Register an account with us"}
            </Link>
          )}
        </form>
      </Box>
    </div>
  );
};

export default LoginForm;
