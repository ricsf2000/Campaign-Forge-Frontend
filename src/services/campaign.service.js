import { callExternalApi } from './external-api.service';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getCampaigns = async (accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/campaigns`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApi({ config });
};

export const createCampaign = async (campaignData, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/campaigns`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: campaignData,
  };

  return await callExternalApi({ config });
};

export const updateCampaign = async (campaignId, campaignData, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/campaigns/${campaignId}`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: campaignData,
  };

  return await callExternalApi({ config });
};

export const deleteCampaign = async (campaignId, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/campaigns/${campaignId}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApi({ config });
};

export const getCampaignById = async (campaignId, accessToken) => {
    const config = {
      url: `${apiServerUrl}/api/v1/campaigns/${campaignId}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
  
    return await callExternalApi({ config });
  };
  