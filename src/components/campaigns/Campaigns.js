import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './Campaigns.css'; 
import api from '../../api/axiosConfig';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [error, setError] = useState(null);

    const getCampaigns = async () => {
        try {
            const response = await api.get("/api/v1/campaigns");
            console.log(response.data);
            setCampaigns(response.data);
        } catch (err) {
            console.error(err);
            setError(err.message || 'An error occurred');
        }
    };

    useEffect(() => {
        getCampaigns();
    }, []);

    const handleEdit = (campaignId) => {
        console.log(`Edit campaign with ID: ${campaignId}`);
        // Implement your edit logic here
    };

    const handleDelete = (campaignId) => {
        console.log(`Delete campaign with ID: ${campaignId}`);
        // Implement your delete logic here
    };

    return (
        <Container className='mt-2'>
            <h1 id="campaign-title"><strong>My Campaigns</strong></h1>
            {error && <p>{error}</p>}
            <Container className='m-3'>
                {campaigns.map(campaign => (
                    <Row key={campaign._id}>
                        <Card className="campaigns-card mb-2">
                            <Row>
                                <Col xs={10}>
                                    {/* Link to the campaign details page */}
                                    <Link to={`/campaigns/${campaign._id}`} className="campaign-link">
                                        <h3>{campaign.name}</h3>
                                    </Link>
                                    <p>{campaign.description}</p>
                                </Col>
                                <Col xs={2} className="d-flex align-items-center justify-content-end">
                                    <Dropdown>
                                        <Dropdown.Toggle variant="transparent" id="dropdown-basic" className="kebab-menu">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                            </svg>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => handleEdit(campaign._id)}>Rename</Dropdown.Item>
                                            <Dropdown.Item onClick={() => handleDelete(campaign._id)} className="text-danger">Delete</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                        </Card>
                    </Row>
                ))}
            </Container>
        </Container>
    );
};

export default Campaigns;
