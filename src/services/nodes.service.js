import { callExternalApi } from './external-api.service';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const addNodeToMap = async (mapId, nodeData, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/maps/${mapId}/nodes`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: nodeData,
  };

  return await callExternalApi({ config });
};

export const updateNodeInMap = async (mapId, nodeId, nodeData, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/maps/${mapId}/nodes/${nodeId}`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: nodeData,
  };

  return await callExternalApi({ config });
};

export const deleteNodeFromMap = async (mapId, nodeId, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/maps/${mapId}/nodes/${nodeId}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApi({ config });
};
