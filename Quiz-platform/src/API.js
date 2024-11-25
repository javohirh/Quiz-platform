import axios from "axios";

const BASE_API = "https://alibekmoyliyev.uz/api";

const request = axios.create({
  baseURL: BASE_API,
});

export default request;
export const REQUESTS = {
  category_api: "/category",
  sub_category: "/sub-category",
  quiz: "/quiz",
  option: "/option",
};
