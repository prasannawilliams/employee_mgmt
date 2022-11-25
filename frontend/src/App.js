import { EmployeeProvider } from "../src/context/employeesContext";
import EmployeeHomePage from "./pages/employee";

function App() {
  return (
    <EmployeeProvider>
      <EmployeeHomePage />
    </EmployeeProvider>
  );
}

export default App;
