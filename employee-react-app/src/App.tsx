import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddEditEmployeePage from "./pages/AddEditEmployeePage";

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-employee" element={<AddEditEmployeePage />} />
          <Route path="/edit-employee" element={<AddEditEmployeePage />} />
        </Routes>
    </Router>
  );
}

export default App;
