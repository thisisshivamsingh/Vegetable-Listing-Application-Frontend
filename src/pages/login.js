import React, { useState } from "react";
import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const [role, setRole] = useState({ role: "user" });

  const handleSelectChange = (event) => {
    event.preventDefault();
    setRole((prev) => ({ ...prev, role: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3001/v1/users", role);
      if (response.status === 200) {
        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));
          router.push(`/`);
        } else if (!response.data.token) {
          localStorage.setItem("token", JSON.stringify(null));
          router.push(`/`);
        }
      }
      console.log("response", response);
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  return (
    <Row className="justify-content-center mt-5">
      <Col md="6">
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="p-4 border rounded text-light bg-primary"
        >
          <h2 className="text-center mb-4">Login</h2>

          <Form.Group className="mb-3">
            <Form.Label>Select an option</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleSelectChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" variant="light" className="w-100 mt-3">
            Login
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
