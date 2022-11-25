import React from "react";
import "./index.css";
import EmployeesList from "../employeesList";
import EmployeeForm from "../employeeForm";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEmployees } from "../../context/employeesContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const { employees,manageState,setModalState,modalState,deleteEmployee } = useEmployees();
  const handleOpen = () => setModalState(true);
  const handleClose = () => setModalState(false);

  const handleEditEmployee = async (data) => {
    await manageState({selectedEmployeeToEdit:data});
    handleOpen()
  };

  const handleDeleteEmployee = async (id) => {
    console.log('%c id Prasanna----->:','font-weight: bold', id);
    await deleteEmployee(id);
  };

  if (!employees) return <div>Loading...</div>;
  return (
    <div className="home">
      <div className="home__container">
        <div className="home__btnContainer">
          <button className="home__btn2" onClick={handleOpen}>
            Add Employee
          </button>
        </div>
      </div>
      <div className="home__container2">
        {employees.map((employeeItem) => {
          return (
            <div className="employee__list__chip">
              <EmployeesList
                data={employeeItem}
                handleEditEmployee={handleEditEmployee}
                handleDeleteEmployee={handleDeleteEmployee}
              />
            </div>
          );
        })}
      </div>

      <Modal
        open={modalState}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <EmployeeForm />
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
