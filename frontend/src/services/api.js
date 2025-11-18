import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:1337/api",
});

export const getPanoramas = async () => {
    const res = await API.get("/panoramas?populate=*");
    return res.data.data;
};
