import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from "./CenteredContainer";

const ForgotPassword = () => {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();

  const { resetPassword } = useAuth();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instruction");
    } catch {
      setError("Failed to reset Password");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mt-2" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disable={loading} className="w-100 mt-3" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 mt-3 text-center">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredContainer>
  );
};

export default ForgotPassword;
