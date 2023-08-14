import axios from 'axios';

const errorHandler = (err: Error) => {
  console.error(err.message);

  return null;
};

export const axiosGet = <T>(url: string) =>
  axios.get<T>(url).then((res) => res.data, errorHandler);

export const axiosPut = <T>(url: string, data: any) =>
  axios.put<T>(url, data).then((res) => res.data, errorHandler);
