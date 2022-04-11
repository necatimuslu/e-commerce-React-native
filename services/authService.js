import axios from "axios";
import { baseUrl } from "../global/baseUrl";

export const loginUser = async (userForm) =>
  await axios.post(`${baseUrl}/user/login`, userForm);

export const registerUser = async (userForm) =>
  await axios.post(`${baseUrl}/user/register`, userForm);
