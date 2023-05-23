import axios from 'axios'
import Director from '../components/Director/Director';

const getAll = (url) => axios.get(url);

const getById = (url, userId) => axios.get(`${url}/${userId}`);

// const addUser = (url, obj) => axios.post(url, obj);

const addUser = async (url, user) => {
    try {
        const response = await axios.post(`${url}`, user);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}
// const CheckPassword = async (url,userData) => {
//     try {
//         const response = await axios.post(`${url}`,userData);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }
export const CheckPassword = async (url, user) => {
    try {
        const response = await axios.post(`${url}`, user);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

// const response = await axios.post(`${url}/${userData}`);

const updateItem = (url, userId, obj) => axios.patch(`${url}/${userId}`, obj);

const AddSensor = async (url, sensor) => {
    try {
        const response = await axios.post(`${url}`, sensor);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

const DeleteSensor = async (url, sensor) => {
    try {
        const response = await axios.post(`${url}`, sensor);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

export { DeleteSensor, AddSensor, addUser, getById, getAll, updateItem };
