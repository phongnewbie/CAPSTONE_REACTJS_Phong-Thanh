import axios from "axios";
import { getStringLocal } from "./config";
import { DOMAIN_BE, USER_LOGIN } from "./constant";

export const http = axios.create({
  baseURL: DOMAIN_BE,
  timeout: 6000,
});

// interceptor => can thiệp một hàm middleware vào request và response khi gọi api
http.interceptors.request.use(
  (config) => {
    const token = getStringLocal(USER_LOGIN);

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
        TokenCybersoft:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
      },
    };
  },
  (err) => {
    console.log(err);
  }
);
