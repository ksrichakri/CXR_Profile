import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import RequestForm from "./pages/RequestForm";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/request" element={<RequestForm />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<AdminDashboard />} />

      </Routes>

    </BrowserRouter>

  );

}

export default App;