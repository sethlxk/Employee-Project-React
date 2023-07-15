export const validateName = (name: string) => {
  const errorProp = { isValid: true, errorMessage: "" };
  if (!name) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter a name";
  } else if (!name.trim().length) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter only alphabets";
  } else if (!/^[ a-zA-Z]+$/.test(name)) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter only alphabets";
  } else if (name.length < 4 || name.length > 30) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Name must be between 4 and 30 characters";
  }
  return errorProp;
};

export const validateSalary = (salary: string) => {
  const errorProp = { isValid: true, errorMessage: "" };
  if (!salary) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter a salary";
  } else if (!/^[0-9]+$/.test(salary)) {
    errorProp.isValid = false;
    errorProp.errorMessage = "Please enter only valid digits";
  }

  return errorProp;
};
