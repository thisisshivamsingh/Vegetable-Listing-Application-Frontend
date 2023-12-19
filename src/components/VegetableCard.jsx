import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useRouter } from "next/router";
import { socket } from "../socket";

const VegetableCard = () => {
  const router = useRouter();
  const [vegetables, setVegetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [token, setToken] = useState("");

  // socket
  const [isConnected, setIsConnected] = useState(socket.connected);

  function onConnect() {
    setIsConnected(true);
  }
  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  useEffect(() => {
    socket.on("get-new-data", getVegetableDet);
  }, [socket]);

  useEffect(() => {
    let storedValue = JSON.parse(localStorage.getItem("token"));
    setToken(storedValue);
  }, []);

  const getVegetableDet = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3001/v1/vegetables");
      console.log("hellloo", response);
      setVegetables(response.data.data);
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getVegetableDet();
  }, []);

  const handleEdit = (id) => {
    router.push(`/edit-item/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:3001/v1/vegetables/${id}`
      );

      if (response.status == 204) {
        getVegetableDet();
      }
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <Row xs={1} md={2} className="g-4 mt-2 mb-2 mx-2">
      {vegetables.map((vegetable, idx) => (
        <Col key={idx} xs={12} md={6} lg={4} xl={3} className="mb-4">
          <Card className="h-100">
            <Card.Img
              variant="top"
              src="/vegetable.webp"
              className="card-img-top"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{vegetable.name}</Card.Title>
              <Card.Text className="flex-grow-1">
                <strong>Price:</strong> $
                {vegetable.price && vegetable.price.toFixed(2)}
                <br />
                <strong>Unit Per Price:</strong> {vegetable.unitPerPrice}{" "}
                {vegetable.unit}
                <br />
                <strong>Quantity:</strong> {vegetable.quantity}
              </Card.Text>
              {token ? (
                <>
                  <Button
                    variant="primary"
                    className="mb-2"
                    onClick={() => handleEdit(vegetable._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(vegetable._id)}
                  >
                    Delete
                  </Button>
                </>
              ) : null}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default VegetableCard;
