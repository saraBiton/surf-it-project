import axios from "axios";

import { basicUrl } from "./config";

const getAll = () => axios.get(basicUrl + `users`);



const getAllSensors = () => axios.get(basicUrl + `sensors`);

const sensor = {
  getAllSensors() {
    return axios.get(basicUrl + `sensors`);
  },
  getById(id) {
    return axios.get(basicUrl + `sensors/` + id);
  },
};

const getAllItems = (url) => axios.get(url);
const getById = (url, id) => axios.get(`${url}/${id}`);
const addItem = (url, item) => axios.post(`${url}/new`, item);
const updateItem = (url, id, obj) => axios.put(`${url}/${id}/edit`, obj);
const deleteItem = (url, id) => axios.delete(`${url}/${id}/delete`);


export const CheckPassword = async (url, user) => {
  try {
    const response = await axios.post(`${url}`, user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};



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
  getAllSensors,
  sensor,

  sendData,

  getAll,

  addItem,
  getById,
  updateItem,
  deleteItem,
  getAllItems
};
