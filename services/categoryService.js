import axios from "axios";
import { baseUrl } from "../global/baseUrl";

export const getAllCategories = async () =>
  await axios.get(`${baseUrl}/category`);

export const addNewCategory = async (categoryForm) =>
  await axios.post(`${baseUrl}/category`, categoryForm);

export const deleteCategory = async (id) =>
  await axios.delete(`${baseUrl}/category/${id}`);
