import { callExternalApi } from './external-api.service';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getMaps = async (campaignId, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/maps/campaign/${campaignId}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApi({ config });
};

export const getMapById = async (mapId, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/maps/${mapId}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApi({ config });
};

export const createMap = async (campaignId, mapData, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/maps/campaign/${campaignId}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: mapData,
  };

  return await callExternalApi({ config });
};

export const updateMap = async (mapId, mapData, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/maps/${mapId}`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: mapData,
  };

  return await callExternalApi({ config });
};

export const deleteMap = async (mapId, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/maps/${mapId}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApi({ config });
};
