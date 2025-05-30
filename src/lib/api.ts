import axios from "axios";

export const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL + "/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("access_token")
      ? `Bearer ${localStorage.getItem("access_token")}`
      : "",
  },
});

export const authAPI = {
  login: (data: any) => api.post("/auth/login", data),
};

export const brandAPI = {
  getAll: () => api.get("/brand"),
  create: (data: any) => api.post("/brand", data),
  update: (id: number, data: any) => api.put(`/brand/${id}`, data),
  delete: (id: number) => api.delete(`/brand/${id}`),
  getBrandById: (id: number) => api.get(`/brand/${id}`),
};

export const categoryAPI = {
  getAll: () => api.get("/category"),
  create: (data: any) => api.post("/category", data),
  update: (id: number, data: any) => api.put(`/category/${id}`, data),
  delete: (id: number) => api.delete(`/category/${id}`),
  getCategoryById: (id: number) => api.get(`/category/${id}`),
};

export const offerAPI = {
  getAll: () => api.get("/offers"),
  create: (data: any) => api.post("/offers", data),
  update: (id: number, data: any) => api.put(`/offers/${id}`, data),
  delete: (id: number) => api.delete(`/offers/${id}`),
  getOfferById: (id: number) => api.get(`/offers/${id}`),
};

export const promoCodeAPI = {
  getAll: () => api.get("/promo-code"),
  create: (data: any) => api.post("/promo-code", data),
  update: (id: number, data: any) => api.put(`/promo-code/${id}`, data),
  delete: (id: number) => api.delete(`/promo-code/${id}`),
  getPromoCodeById: (id: number) => api.get(`/promo-code/${id}`),
};

export const addonAPI = {
  getAll: () => api.get("/addons"),
  create: (data: any) => api.post("/addons", data),
  update: (id: string, data: any) => api.put(`/addons/${id}`, data),
  delete: (id: number) => api.delete(`/addons/${id}`),
  getById: (id: string) => api.get(`/addons/${id}`),
};

export const productAPI = {
  getAll: () => api.get("/products"),
  create: (data: any) => api.post("/products", data),
  update: (id: number, data: any) => api.put(`/products/${id}`, data),
  delete: (id: number) => api.delete(`/products/${id}`),
  search: (filters: any) => api.get(`/products/search/?${filters}`),
  featured: () => api.get("/products/featured"),
  getProductById: (id: number) => api.get(`/products/${id}`),
};

export const bundleAPI = {
  getAll: () => api.get("/bundle"),
  create: (data: any) => api.post("/bundle", data),
  update: (id: number, data: any) => api.put(`/bundle/${id}`, data),
  delete: (id: number) => api.delete(`/bundle/${id}`),
  getBundleById: (id: number) => api.get(`/bundle/${id}`),
};

export const userAPI = {
  getAll: () => api.get("/users"),
  getAllSubscriber: (id: number) => api.get(`/users/subscribers/${id}`),
  create: (data: any) => api.post("/users", data),
  update: (id: number, data: any) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
  getUserById: (id: number) => api.get(`/users/${id}`),
};

export const paymentAPI = {
  getAllByUserId: (id: number) => api.get(`/payments/user/${id}`),
  create: (data: any) => api.post("/payments", data),
};

export const subscriptionsAPI = {
  getAllByUserId: (id: number) => api.get(`/subscriptions/user/${id}`),
  create: (data: any) => api.post("/subscriptions", data),
};

export const subscriptionsItemsAPI = {
  getAllByUserId: (id: number) => api.get(`/subscription-items/user/${id}`),
  create: (data: any) => api.post("/subscription-items", data),
  active: (id: number, data?: any) =>
    api.post(`/subscription-items/activate/${id}`, data),
};

export const uploadAPI = {
  products: (data: any) => api.post("/upload/product", data),
};
export default api;
