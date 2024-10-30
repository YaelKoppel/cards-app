import axios from "axios";

export const http = axios.create({
    baseURL: "https://fakestoreapi.com",
    // url: "",
    headers: {
        "Content-type": "application/json"
    }
});

export const http2 = axios.create({
    baseURL: "https://localhost:8080",
    // url: "",
    headers: {
        "Content-type": "application/json"
    }
});