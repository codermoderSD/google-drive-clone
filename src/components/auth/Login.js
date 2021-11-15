import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from "./CenteredContainer";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSignup(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/", { replace: true });
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mt-2" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group className="mt-2" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disable={loading} className="w-100 mt-3" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 mt-3 text-center">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </CenteredContainer>
  );
};

export default Login;
