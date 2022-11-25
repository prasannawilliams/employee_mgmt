import axios from "axios";

const baseurl = "http://localhost:8000";

export const createEmployeeApi = `${baseurl}/createEmployee`;
export const updateEmployeeById = `${baseurl}/updateEmployeeById`;
export const getAllEmployees = `${baseurl}/getAllEmployees`;
export const getEmployeeById = `${baseurl}/getEmployeeById`;
export const deleteEmployeeById = `${baseurl}/deleteEmployeeById`;

export const createEmployeeMethod = async (employee) => {
  try {
    let bodyFormData = new FormData();
    bodyFormData.append("name", employee.name);
    bodyFormData.append("age", employee.age);
    bodyFormData.append("address", employee.address);
    bodyFormData.append("email", employee.email);
    bodyFormData.append("date_of_birth", employee.date_of_birth);
    bodyFormData.append("photo", employee.photo);
    await axios({
      method: "post",
      url: `${createEmployeeApi}`,
      data: bodyFormData,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    const getEmployees = await axios.get(getAllEmployees);
    return getEmployees;
  } catch (error) {}
};

export const updateEmployeeMethod = async (employeeId, employee) => {
  try {
    let bodyFormData = new FormData();
    bodyFormData.append("name", employee.name);
    bodyFormData.append("age", employee.age);
    bodyFormData.append("address", employee.address);
    bodyFormData.append("email", employee.email);
    bodyFormData.append("date_of_birth", employee.date_of_birth);
    bodyFormData.append("photo", employee.photo);
    await axios({
      method: "patch",
      url: `${updateEmployeeById}?id=${employeeId}`,
      data: bodyFormData,
      headers: {
        "Content-Type": `multipart/form-data`,
      },
    });
    const getEmployees = await axios.get(getAllEmployees);
    return getEmployees;
  } catch (error) {}
};

export const getEmployeesListMethod = async () => {
  try {
    const getEmployees = await axios.get(getAllEmployees);
    return getEmployees;
  } catch (error) {}
};

export const deleteEmployeeByIdMethod = async (employeeId) => {
  try {
    await axios.delete(`${deleteEmployeeById}?id=${employeeId}`);
    const getEmployees = await axios.get(getAllEmployees);
    return getEmployees;
  } catch (error) {}
};
