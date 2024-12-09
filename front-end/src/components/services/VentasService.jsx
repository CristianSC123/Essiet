const API_URL = "http://localhost:5000/api/ventas";

export const fetchVentas = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createVenta = async (venta) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(venta),
  });
  return response.json();
};
