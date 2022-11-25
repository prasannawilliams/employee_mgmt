const routes = require("express").Router();
const employeeController = require("../controllers/employeeController");

// +-------------------------------------------------------------------------+
// | EMPLOYEE APIS                                                            |
// +-------------------------------------------------------------------------+
routes.post("/createEmployee", employeeController.createEmployee);
routes.patch("/updateEmployeeById", employeeController.updateEmployeeById);
routes.get("/getEmployeeById", employeeController.getEmployeeById);
routes.get("/getAllEmployees", employeeController.getAllEmployees);
routes.delete("/deleteEmployeeById", employeeController.deleteEmployeeById);

module.exports = routes;
