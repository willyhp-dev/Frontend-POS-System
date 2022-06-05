
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";


import AdminPage from "./components/admin";

function App() {
  return (
    <Router>
      <div>
        <AdminPage />
      </div>
    </Router>
  );
}

export default App;
