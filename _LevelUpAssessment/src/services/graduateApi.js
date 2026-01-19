const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5234";

const handleResponse = async (response) => {
  if (response.ok) {
    if (response.status === 204) {
      return null;
    }
    return response.json();
  }

  const errorPayload = await response.json().catch(() => null);
  const errorMessage = errorPayload?.title || errorPayload?.message || "Request failed.";
  throw new Error(errorMessage);
};

export const fetchGraduates = () =>
  fetch(`${API_BASE_URL}/api/graduates`).then(handleResponse);

export const fetchGraduate = (id) =>
  fetch(`${API_BASE_URL}/api/graduates/${id}`).then(handleResponse);

export const createGraduate = (payload) =>
  fetch(`${API_BASE_URL}/api/graduates`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const updateGraduate = (id, payload) =>
  fetch(`${API_BASE_URL}/api/graduates/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).then(handleResponse);

export const deleteGraduate = (id) =>
  fetch(`${API_BASE_URL}/api/graduates/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
