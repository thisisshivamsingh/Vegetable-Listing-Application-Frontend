import React, { useState, useEffect } from "react";
import { Form, Button, Container, Col } from "react-bootstrap";
import axios from "axios";
import { useRouter } from "next/router";

const EditItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    unitPerPrice: "",
    unit: "",
    quantity: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const getVegetableDet = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:3001/v1/vegetable/${id}`
      );

      for (const [key, value] of Object.entries(response.data.data)) {
        if (
          key &&
          key !== "_id" &&
          key !== "createdAt" &&
          key !== "updatedAt"
        ) {
          setFormData((prev) => ({ ...prev, [key]: value }));
          formData.key = value;
        }
      }

      setVegetables(response.data.data);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVegetableDet();
  }, [router.query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://127.0.0.1:3001/v1/vegetable/${id}`,
        formData
      );
      console.log(response, "________");
      if (response.status === 200) {
        router.push(`/`);
      }
    } catch (error) {
      console.log("Error fetching data");
    }
  };

  return (
    <Container className="mt-5">
      <Col
        md={{ span: 6, offset: 3 }}
        className="bg-success text-light p-4 rounded"
      >
        <h2 className="text-center mb-4">Edit Item</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUnitPerPrice">
            <Form.Label>Unit Per Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter unit per price"
              name="unitPerPrice"
              value={formData.unitPerPrice}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUnit">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="light" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Container>
  );
};

export default EditItem;
