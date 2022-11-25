const employeeModel = require("../../models/employee");
const moment = require("moment");

//create employee controller
exports.createEmployee = async (req, res) => {
  const data = new employeeModel({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    address: req.body.address,
    photo:
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg",
    date_of_birth: req.body.date_of_birth,
  });

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update employee controller
exports.updateEmployeeById = async (req, res) => {
  try {
    const id = req.query.id;
    let updatedData = req.body;
    updatedData.photo =
      "https://images.squarespace-cdn.com/content/v1/60f1a490a90ed8713c41c36c/1629223610791-LCBJG5451DRKX4WOB4SP/37-design-powers-url-structure.jpeg";
    const options = { new: true };
    const result = await employeeModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all employees controller
exports.getAllEmployees = async (req, res) => {
  try {
    const data = await employeeModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get employee by id controller
exports.getEmployeeById = async (req, res) => {
  try {
    const data = await employeeModel.findById(req.query.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete employee controller
exports.deleteEmployeeById = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await employeeModel.findByIdAndDelete(id);
    res.status(200).send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
