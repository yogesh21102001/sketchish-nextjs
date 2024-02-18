import axios from "axios";
import handleError from "./handleError";
import { stringifyQuery } from "./url";

class Api {
  constructor() {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}`,
    });
    this.instance.interceptors.request.use((req) => {
      if (req?.url !== "services") {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser) {
          const _token = currentUser.token || "";
          if (_token) {
            req.headers.Authorization = `Bearer ${_token}`;
          }
        }
      }
      return req;
    });
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log("error", error.response.status)
        if (error.response && error.response.status === 401) {
          if (localStorage.getItem('user')) {
            // Remove user key from localStorage
            localStorage.clear();
            // Reload the site
            window.location.href = "/"
          }
        }

        if (error.config && error.config.skipError) {
          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    );
  }

  async get(endpoint, params = {}, config = {}) {
    return this.instance
      .get(endpoint, {
        ...config,
        params,
      })
      .catch(async (error) => {
        if (config && config.skipError) {

        } else {
          await handleError(error, config);
        }
      });
  }

  async post(endpoint, data = {}, config) {
    return this.instance
      .post(endpoint, data, config)
      .catch(async (error) => await handleError(error, config));
  }

  async put(endpoint, data = {}, config) {
    return this.instance
      .put(endpoint, data, config)
      .catch(async (error) => await handleError(error, config));
  }

  async patch(endpoint, data = {}, config) {
    return this.instance
      .patch(endpoint, data, config)
      .catch(async (error) => await handleError(error, config));
  }

  async delete(endpoint, config) {
    return this.instance
      .delete(endpoint, config)
      .catch(async (error) => await handleError(error, config));
  }

  async request(config) {
    return this.instance
      .request(config)
      .catch(async (error) => await handleError(error, config));
  }

  async xWWWFormURLEncoded(endpoint, method, data) {
    return this.instance({
      method,
      url: endpoint,
      data: stringifyQuery(data),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }).catch(async (error) => await handleError(error));
  }

  async formData(endpoint, method, data) {
    return this.instance({
      method,
      url: endpoint,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).catch(async (error) => await handleError(error));
  }
}

export default new Api();
