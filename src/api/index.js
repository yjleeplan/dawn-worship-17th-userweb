import axios from "axios";

// config
const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASEURL,
  timeout: 30000,
});

// set headers
const headers = (header) => {
  return {
    headers: {
      project_id: process.env.REACT_APP_PROJECT_ID,
      ...(header && header),
    },
  };
};

// api
export const createUser = ({ data }) => {
  return request.post("/users", data, headers());
};

export const listUser = ({ query }) => {
  return request.get("/users", {
    params: query,
    ...headers(),
  });
};

export const listUserForExcel = ({ query }) => {
  return request.get("/excel/users", {
    params: query,
    ...headers(),
  });
};

export const selectUser = ({ path }) => {
  return request.get(`/users/${path.user_id}`, {
    ...headers(),
  });
};

export const updatedAttendance = ({ path, data }) => {
  return request.put(`/attendance/${path.attendance_id}`, data, headers());
};

export const createComment = ({ data }) => {
  return request.post("/comments", data, headers());
};

export const listComment = ({ query }) => {
  return request.get("/comments", {
    params: query,
    ...headers(),
  });
};

export const listDepartmentCount = ({ query }) => {
  return request.get("/department/count", {
    params: query,
    ...headers(),
  });
};

export const updateDepartmentFreeCount = ({ path, data }) => {
  return request.put(`/department/${path.department_id}/free_count`, data, headers());
};
