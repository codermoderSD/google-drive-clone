import { AuthProvider } from "../context/AuthContext";
import Signup from "./auth/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./auth/Profile";
import Login from "./auth/Login";
import PrivateRoute from "./auth/PrivateRoute";
import ForgotPassword from "./auth/ForgotPassword";
import UpdateProfile from "./auth/UpdateProfile";
import Dashboard from "./quaddrive/Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Profile */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/user" element={<Profile />} />
            <Route path="/update-profile" element={<UpdateProfile />} />
            <Route path="/folder/:folderId" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
