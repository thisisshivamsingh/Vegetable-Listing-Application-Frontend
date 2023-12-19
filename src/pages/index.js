import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import VegetableCard from "@/components/VegetableCard";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [token, setToken] = useState("");
  useEffect(() => {
    let storedValue = JSON.parse(localStorage.getItem("token"));
    setToken(storedValue);
  }, []);

  return (
    <>
      <Navbar bg="success" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href={"/login"} className="text-light">
              Login
            </Nav.Link>
            {token ? (
              <Nav.Link href={"/add-item"} className="text-light">
                Add Item
              </Nav.Link>
            ) : null}
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text className="text-light">
                Signed in as:{" "}
                <a className="text-light" href={"/login"}>
                  {" "}
                  {token ? "Admin" : "User"}
                </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Nav>
        </Container>
      </Navbar>
      <VegetableCard />
    </>
  );
}
