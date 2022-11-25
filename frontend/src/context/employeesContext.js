import { createContext, useContext, useEffect, useState } from "react";
import {
  createEmployeeMethod,
  updateEmployeeMethod,
  getEmployeesListMethod,
  deleteEmployeeByIdMethod,
} from "../api";
const employeeContext = createContext();

export const useEmployees = () => {
  const context = useContext(employeeContext);
  if (!context) throw new Error("Employee Provider is required");
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [employeeLoader, setEmployeeLoader] = useState(false);
  const [errorMsg, setErrMsg] = useState("");
  const [modalState, setModalState] = useState(false);
  const [selectedEmployeeToEdit, setSelectedEmployeeToEdit] = useState(null);

  useEffect(() => {
    (async () => {
      const getEmployees = await getEmployeesListMethod();
      setEmployees(getEmployees.data);
    })();
  }, []);

  const createEmployee = async (employee) => {
    try {
      console.log("employee", employee);
      setEmployeeLoader(true);
      let addEmployeeRes = await createEmployeeMethod(employee);
      setEmployees(addEmployeeRes.data);
      setEmployeeLoader(false);
      setModalState(false);
      return addEmployeeRes;
    } catch (error) {
      console.error(error);
      setErrMsg(error.message);
    }
  };

  const updateEmployee = async (id, employee) => {
    try {
      console.log("employee", employee);
      setEmployeeLoader(true);
      let editEmployeeRes = await updateEmployeeMethod(id, employee);
      setEmployees(editEmployeeRes.data);
      setEmployeeLoader(false);
      setModalState(false);
      setSelectedEmployeeToEdit(null);
      return;
    } catch (error) {
      console.error(error);
      setErrMsg(error.message);
    }
  };

  const deleteEmployee = async (employeeId) => {
    try {
      setEmployeeLoader(true);
    let deleteEmployee = await deleteEmployeeByIdMethod(employeeId);
    setEmployees(deleteEmployee.data);
    setEmployeeLoader(false);
    } catch (error) {
      setErrMsg(error.message);
    }    
  };

  const manageState = async (payload) => {
    setSelectedEmployeeToEdit(payload.selectedEmployeeToEdit);
  };

  return (
    <employeeContext.Provider
      value={{
        employees,
        setModalState,
        createEmployee,
        deleteEmployee,
        updateEmployee,
        employeeLoader,
        manageState,
        selectedEmployeeToEdit,
        modalState,
        errorMsg
      }}
    >
      {children}
    </employeeContext.Provider>
  );
};
