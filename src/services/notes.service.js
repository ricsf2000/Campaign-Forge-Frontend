import { callExternalApi } from './external-api.service';

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const getNotes = async (campaignId, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/notes/campaign/${campaignId}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApi({ config });
};

export const createNote = async (campaignId, noteData, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/notes/campaign/${campaignId}`,
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: noteData,
  };

  return await callExternalApi({ config });
};

export const updateNote = async (noteId, noteData, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/notes/${noteId}`,
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    data: noteData,
  };

  return await callExternalApi({ config });
};

export const deleteNote = async (noteId, accessToken) => {
  const config = {
    url: `${apiServerUrl}/api/v1/notes/${noteId}`,
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return await callExternalApi({ config });
};
