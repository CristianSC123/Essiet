const API_URL = "http://localhost:5000/api/pantallas";

export const fetchPantallas = async (search) => {
  const response = await fetch(`${API_URL}?search=${search}`);
  return response.json();
};
