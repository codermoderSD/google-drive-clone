import React, { useRef, useState } from "react";
import { Form, Card, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CenteredContainer from "./CenteredContainer";

const UpdateProfile = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const navigate = useNavigate();

  const { currUser, updatePassword, updateEmail } = useAuth();

  function handleSignup(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promise = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currUser.email) {
      promise.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promise.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promise)
      .then(() => {
        navigate("/user", { replace: true });
      })
      .catch(() => {
        setError("Failed to update the account");
      });
  }

  return (
    <CenteredContainer>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSignup}>
            <Form.Group className="mt-2" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currUser.email}
              />
            </Form.Group>
            <Form.Group className="mt-2" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group className="mt-2" id="password-confirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disable={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/user">Cancel</Link>
      </div>
    </CenteredContainer>
  );
};

export default UpdateProfile;
