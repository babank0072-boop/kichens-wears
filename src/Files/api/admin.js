import axios from "axios";
import { Constants } from "./env";

const API = axios.create({
  baseURL: Constants.base,  // ✅ MATCH YOUR SERVER
  withCredentials: true,
});

export const createCategory = async (data) => {
  const res = await API.post("/categories", data);
  return res.data;
};

export const getAllCategories = async () => {
  const res = await API.get("/categories");
  return res.data;
};

export const deleteCategory = async (id) => {
  const res = await API.delete(`/categories/${id}`);
  return res.data;
};
