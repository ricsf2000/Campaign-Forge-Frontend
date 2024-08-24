import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';  
import { useAuth0 } from "@auth0/auth0-react";
import { getCampaigns, deleteCampaign } from '../../services/campaign.service';
import './Campaigns.css';

const Campaigns = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        const fetchCampaigns = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const response = await getCampaigns(accessToken);
                
                const campaignsWithStringIds = response.data.map(campaign => ({
                    ...campaign,
                    id: campaign.id.toString() 
                }));
    
                setCampaigns(campaignsWithStringIds);
            } catch (err) {
                setError(err.message || 'An error occurred');
            } finally {
                setLoading(false); 
            }
        };
    
        fetchCampaigns();
    }, [getAccessTokenSilently]);
    

    const handleDelete = async (campaignId) => {
        try {
            const accessToken = await getAccessTokenSilently();
            await deleteCampaign(campaignId, accessToken);
            setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
        } catch (err) {
            setError(err.message || 'An error occurred while deleting the campaign');
        }
    };
    

    return (
        <Container className='mt-2'>
            <div className="campaign-title">
                <h1 ><strong>My Campaigns</strong></h1>
                <Link to="/campaigns/new" className='new-campaign-btn mt-1'><Button >Create Campaign</Button></Link>
            </div>
            {error && <p>{error}</p>}
            <Container className='m-3'>
                {loading ? (  
                    <div className="d-flex justify-content-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    campaigns.map(campaign => (
                        <Row key={campaign.id.toString()}>
                            <Card className="campaigns-card mb-2">
                                <Row>
                                    <Col xs={10}>
                                        <Link to={`/campaigns/${campaign.id}`} className="campaign-link">
                                            <h3><strong>{campaign.name}</strong></h3>
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
                                                <Dropdown.Item onClick={() => handleDelete(campaign.id)} className="text-danger">Delete</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </Col>
                                </Row>
                            </Card>
                        </Row>
                    ))
                )}
            </Container>
        </Container>
    );
};

export default Campaigns;
