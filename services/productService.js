import axios from "axios";
import { baseUrl } from "../global/baseUrl";

export const getAllProducts = async () => await axios.get(`${baseUrl}/product`);

export const deleteProduct = async (id) =>
  await axios.delete(`${baseUrl}/product/${id}`);

export const addNewProduct = async (productForm) =>
  await axios.post(`${baseUrl}/product`, productForm);

export const addNewOrder = async (orderForm) =>
  await axios.post(`${baseUrl}/order`, orderForm);
