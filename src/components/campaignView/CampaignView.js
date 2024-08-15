import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/axiosConfig';

const CampaignView = () => {
    const { campaignId } = useParams(); // Get the campaignId from the route parameter
    const [campaign, setCampaign] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCampaign = async () => {
            try {
                const response = await api.get(`/api/v1/campaigns/${campaignId}`);
                setCampaign(response.data);
            } catch (err) {
                console.error(err);
                setError(err.message || 'An error occurred');
            }
        };

        fetchCampaign();
    }, [campaignId]);

    if (error) {
        return <p>{error}</p>;
    }

    if (!campaign) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{campaign.name}</h1>
            <p>{campaign.description}</p>
            {/* Add more campaign details as needed */}
        </div>
    );
};

export default CampaignView;
