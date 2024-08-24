import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth0 } from "@auth0/auth0-react";
import './Home.css';

const Home = () => {
  const isAuthenticated  = false;
  const navigate = useNavigate();
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/campaigns');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container className="home-container">
      <Row className="text-center my-5">
        <Col>
          <h1><strong>Welcome to Campaign Forge</strong></h1>
          <h5>A tool for planning and mapping out your TRPG campaign.</h5>
          <Link to="/campaigns">
            <Button variant="primary" className="mt-3" onClick={loginWithRedirect}>Get Started</Button>
          </Link>
        </Col>
      </Row>
      <Row className="features-section ">
        <Col s={12} md={4}>
        <Container  className="feature ">
            <h2 className="text-center">Campaign Notes</h2>
            <h5 className="text-center" >Keep detailed notes on your campaign, easily accessible and organized. Record important events, character details, and plot points.</h5>
          </Container>
        </Col>
        <Col s={12} md={4}>
          <Container className="feature">
            <h2 className="text-center">Interactive Maps</h2>
            <h5 className="text-center">Visualize your campaign world by uploading your maps and making them interactive. Make it easy to access information about kingdoms, cities, dungeons, and more.</h5>
          </Container>
        </Col>
        <Col s={12} md={4}>
          <Container  className="feature">
            <h2 className="text-center">Location Management</h2>
            <h5 className="text-center">Place nodes on your maps to mark significant locations, events, or encounters, making it easy to track and manage your campaign's progress.</h5>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;