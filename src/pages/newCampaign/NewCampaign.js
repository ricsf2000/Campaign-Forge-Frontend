import "./NewCampaign.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import { createCampaign, updateCampaign } from '../../services/campaign.service';
import { useAuth0 } from "@auth0/auth0-react";

const NewCampaign = ({ editMode = false, existingCampaign = {} }) => {
    const { getAccessTokenSilently } = useAuth0();
    const [name, setName] = useState(editMode ? existingCampaign.name : '');
    const [description, setDescription] = useState(editMode ? existingCampaign.description : '');
    const navigate = useNavigate();
    const [isEditable, setIsEditable] = useState(!editMode); 

    const handleSubmit = async (event) => {
        event.preventDefault();
        const campaignData = { name, description };

        try {
            const accessToken = await getAccessTokenSilently();
            if (editMode) {
                const campaignId = existingCampaign.id.toString();
                const updatedCampaign = await updateCampaign(campaignId, campaignData, accessToken);
                setName(campaignData.name)
                setDescription(campaignData.description)
                setIsEditable(false);
                console.log('Campaign updated successfully');
            } else {
                await createCampaign(campaignData, accessToken);
                console.log('Campaign created successfully');
                navigate('/campaigns');
            }
            
        } catch (err) {
            console.error('Failed to save campaign:', err);
        }
    };

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleCancelClick = () => {
        setIsEditable(false);
        setName(existingCampaign.name);
        setDescription(existingCampaign.description);
    };

    return (
        <Container className="mt-4">
            <div className="campaign-title">
                <h1><strong>{editMode ? "Campaign Description" : "Create New Campaign"}</strong></h1>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formCampaignName">
                    <Form.Label>Campaign Name</Form.Label>
                    <Form.Control 
                        type="text"
                        value={name}
                        className="formField"
                        onChange={(e) => setName(e.target.value)}
                        readOnly={!isEditable}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formCampaignDescription" className="mt-3">
                    <Form.Label>Campaign Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        className="formField"
                        onChange={(e) => setDescription(e.target.value)}
                        readOnly={!isEditable}
                    />
                </Form.Group>

                {editMode ? (
                    isEditable ? (
                        <>
                            <Button variant="primary" type="submit" className="mt-3">
                                Save
                            </Button>
                            <Button variant="secondary" className="mt-3 ms-2" onClick={handleCancelClick}>
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button variant="primary" className="mt-3" onClick={handleEditClick}>
                            Edit
                        </Button>
                    )
                ) : (
                    <Button variant="primary" type="submit" className="mt-3">
                        Create Campaign
                    </Button>
                )}
            </Form>
        </Container>
    );
};

export default NewCampaign;
