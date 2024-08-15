import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container className='text-center'>
        <a href="/terms-of-service" className="footer-link">Terms of Service</a>
        <span className="separator">|</span>
        <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
        <p>&copy; {new Date().getFullYear()} Campaign Forge. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
