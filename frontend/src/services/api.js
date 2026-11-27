const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export async function fetchApi(endpoint, options = {}) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const token = localStorage.getItem('access_token');
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  getProducts: (category) => fetchApi(`/products/${category ? `?category=${category}` : ''}`),
  getProduct: (id) => fetchApi(`/products/${id}`),
  createOrder: (orderData) => fetchApi('/orders/', { method: 'POST', body: JSON.stringify(orderData) }),
  getOrder: (id) => fetchApi(`/orders/${id}`),
  getAdminMetrics: () => fetchApi('/admin/metrics'),
};
