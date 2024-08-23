import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { getCampaignById } from '../../services/campaign.service';
import { Tabs, Tab, Container } from 'react-bootstrap';
import Maps from '../../components/maps/Maps';
import Notes from '../../components/notes/Notes';
import './CampaignView.css';
import NewCampaign from '../newCampaign/NewCampaign';

const CampaignView = () => {
    const { campaignId } = useParams();
    const [campaign, setCampaign] = useState(null);
    const [error, setError] = useState(null);
    const { getAccessTokenSilently } = useAuth0();
    const [activeTab, setActiveTab] = useState("description");
    const [isNotesLoaded, setIsNotesLoaded] = useState(false); 
    const [isMapsLoaded, setIsMapsLoaded] = useState(false); 
    const [isDescriptionLoaded, setIsDescriptionLoaded] = useState(true); 

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const accessToken = await getAccessTokenSilently();
                const { data, error } = await getCampaignById(campaignId, accessToken);

                if (error) {
                    setError(error.message);
                } else {
                    setCampaign(data);
                }
            } catch (err) {
                console.error(err);
                setError(err.message || 'An error occurred');
            }
        };

        fetchCampaign();
    }, [campaignId, getAccessTokenSilently]);

    const handleTabSelect = (key) => {
        setActiveTab(key);
        if (key === 'notes' && !isNotesLoaded) {
            setIsNotesLoaded(true); 
        }
        if (key === 'maps' && !isMapsLoaded) {
            setIsMapsLoaded(true); 
        }
        if (key === 'description' && !isDescriptionLoaded) {
            setIsDescriptionLoaded(true); 
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!campaign) {
        return <p>Loading...</p>;
    }

    return (
        <Container fluid className="campaignView-container">
            <div className="tabs-container d-flex align-items-center mb-3 pt-2 w-100">
                <h4 className="ms-3 me-3">{campaign.name}</h4>
                <Tabs 
                    activeKey={activeTab}
                    onSelect={handleTabSelect}
                    id="campaign-tabs"
                    className="ms-3"
                >
                    <Tab eventKey="description" title="Description"></Tab>
                    <Tab eventKey="maps" title="Maps"></Tab>
                    <Tab eventKey="notes" title="Notes"></Tab>
                </Tabs>
            </div>
            <div>
                {isDescriptionLoaded && (
                    <div style={{ display: activeTab === "description" ? 'block' : 'none' }}>
                        <NewCampaign editMode={true} existingCampaign={campaign} />
                    </div>
                )}
                {isMapsLoaded && (
                    <div style={{ display: activeTab === "maps" ? 'block' : 'none' }}>
                        <Maps campaignId={campaignId}/>
                    </div>
                )}
                {isNotesLoaded && (
                    <div style={{ display: activeTab === "notes" ? 'block' : 'none' }}>
                        <Notes campaignId={campaignId} />
                    </div>
                )}
            </div>
        </Container>
    );
};

export default CampaignView;
