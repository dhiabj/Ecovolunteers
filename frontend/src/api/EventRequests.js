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

export const getEvent = (id) => API.get(`/events/${id}`);
export const updateEvent = (id) => API.put(`/events/${id}`);
export const getAllEvents = () => API.get("/events");
//export const followUser = (id, data) => API.put(`/user/${id}/follow`, data);
//export const unfollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data);
