import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import './Header.css';
import LoginButton from '../buttons/LoginButton'; 
import LogoutButton from '../buttons/LogoutButton';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Image from "react-bootstrap/Image";
import { FaUserCircle } from "react-icons/fa"; // Import a default user icon

const Header = () => {
    const { isAuthenticated, user, isLoading } = useAuth0();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setShowDropdown(!showDropdown);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (isLoading) {
        return <Navbar style={{ backgroundColor: 'rgb(201, 201, 201)', minHeight: '60px' }} expand="lg"></Navbar>
    }

    return (
        <Navbar style={{ backgroundColor: 'rgb(201, 201, 201)', minHeight: '60px'}} expand="lg">
            <Container fluid>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <h2 className="logo">
                        <strong>CF</strong>
                    </h2>
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <NavLink className="nav-link-custom" to="/">Home</NavLink>
                        <NavLink className="nav-link-custom" to="/campaigns">Campaigns</NavLink>
                    </Nav>
                    
                </Navbar.Collapse>
                {isAuthenticated ? (
                    <div className="d-flex align-items-center ms-auto" ref={dropdownRef}>
                        <DropdownButton
                            id="user-dropdown"
                            title={
                                user.picture ? (
                                    <Image src={user.picture} roundedCircle height="34" />
                                ) : (
                                    <FaUserCircle size={34} /> // Default user icon
                                )
                            }
                            align="end"
                            show={showDropdown}
                            onClick={toggleDropdown}
                        >
                            <Dropdown.Header>
                                <strong>{user.name}</strong>
                                <br />
                                <small>{user.email}</small>
                            </Dropdown.Header>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item as="div">
                                <LogoutButton/>
                            </Dropdown.Item>
                        </DropdownButton>
                    </div>
                ) : (
                    <LoginButton/>
                )}
            </Container>
        </Navbar>
    );
}

export default Header;
