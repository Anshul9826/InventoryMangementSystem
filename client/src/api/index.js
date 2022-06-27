import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchProduct = () => API.get("/products");
export const createProduct = (newProduct) => API.post("/products", newProduct);
export const updateProduct = (id, updatedProduct) =>
  API.patch(`/products/${id}`, updatedProduct);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

export const fetchCategory = () => API.get("/category");
export const createCategory = (newCategory) => API.post("/category", newCategory);
export const updateCategory = (id, updatedCategory) =>
  API.patch(`/category/${id}`, updatedCategory);
export const deleteCategory = (id) => API.delete(`/category/${id}`);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
