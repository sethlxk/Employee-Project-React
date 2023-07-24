export const validateUsername = (username: string) => {
  const errorProp = { isValid: true, errorMessage: "" };
  if (!username) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter a username";
  } else if (!username.trim().length) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter only alphanumerical characters";
  } 
  return errorProp;
};

export const validatePassword = (password: string) => {
  const errorProp = { isValid: true, errorMessage: "" };
  if (!password) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter a password";
  } else if (!password.trim().length) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter only alphanumerical characters";
  }
  return errorProp;
};

export const validateConfirmPassword = (
  confirmPassword: string,
  password: string
) => {
  const errorProp = { isValid: true, errorMessage: "" };
  if (password !== confirmPassword) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please check that it matches your password";
  }
  return errorProp;
};

export const validateDepartment = (department: string) => {
  const errorProp = { isValid: true, errorMessage: "" };
  if(!department){
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter a department";
  }
  return errorProp;
}
