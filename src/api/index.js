import axios from "axios";

// config
const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASEURL,
  timeout: 30000,
});

export const createUser = ({ data }) => {
  return request.post("/users", data);
};

export const listUser = ({ query }) => {
  return request.get("/users", {
    params: query,
  });
};

export const listUserForExcel = () => {
  return request.get("/excel/users");
};

export const selectUser = ({ path }) => {
  return request.get(`/users/${path.user_id}`);
};

export const updatedAttendance = ({ path, data }) => {
  return request.put(`/attendance/${path.attendance_id}`, data);
};

export const createComment = ({ data }) => {
  return request.post("/comments", data);
};

export const listComment = ({ query }) => {
  return request.get("/comments", {
    params: query,
  });
};
