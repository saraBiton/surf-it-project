import axios from "axios";

import { basicUrl } from "./config";

const getAll = () => axios.get(basicUrl + `users`);

const getById = (url, userId) => axios.get(`${url}/${userId}`);

const getAllSensors = () => axios.get(basicUrl + `sensors`);

const sensor = {
  getAllSensors() {
    return axios.get(basicUrl + `sensors`);
  },
  getById(id) {
    return axios.get(basicUrl + `sensors/` + id);
  },
};

const addItem = (url, item) => axios.post(url, item)


export const CheckPassword = async (url, user) => {
  try {
    const response = await axios.post(`${url}`, user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateItem = (url, userId, obj) => axios.put(`${url}/${userId}/edit`, obj);

const sendData = async (url, obj) => {
  try {
    const response = await axios.post(`${url}`, obj);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const DeleteSensor = async (url, sensor) => {
  try {
    const response = await axios.post(`${url}`, sensor);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export {
  DeleteSensor,
  sendData,
  addItem,
  getById,
  getAll,
  updateItem,
  getAllSensors,
  sensor,
};
