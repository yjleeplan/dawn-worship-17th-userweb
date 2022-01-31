import axios from 'axios';

// config
const request = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASEURL,
  timeout: 30000,
});

const headers = (header) => {
  return {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_BACKEND_API_KEY}`,
      ...header && header,
    }
  };
};

const querystring = (query) => {
  return {
    params: query,
  };
};

export const listBooking = ({rsvnNo: reservationNo}) => {
  return request.get(`/ays/v1/${systemId}/reservation/${bsnsCode}/${propertyNo}`, {
    ...headers(),
    ...querystring({
      reservationNo,
    }),
  });
};

export const selectCheckedInBooking = ({folioNo}) => {
  return request.get(`/ays/v1/${systemId}/inhouse/${bsnsCode}/${propertyNo}/${folioNo}`, {
    ...headers(),
  });
};
