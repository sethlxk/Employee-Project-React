export enum Department {
  PS = "PS",
  HR = "HR",
}

export interface Employee {
  id: number;
  name: string;
  salary: number;
  department: Department;
}
