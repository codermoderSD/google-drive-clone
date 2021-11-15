import React, { useState } from "react";
import Button from "@restart/ui/esm/Button";
import { Alert, Card } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CenteredContainer from "./CenteredContainer";

const Profile = () => {
  const [error, setError] = useState("");
  const { currUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login", { replace: true });
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Updated Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </CenteredContainer>
  );
};

export default Profile;
