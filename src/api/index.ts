import axios from "axios";

const base_url: string = process.env.BASE_URL || "http://localhost:3000/";

export const api = {
  get: (url: string) => axios.get(base_url + url),
};
