import axios from "axios";
import config from "../config";

class HTTPService {
  constructor(model) {
    this.api = axios.create();
    this.setDefaultBaseUrl();

    this.api.interceptors.request.use(request => {
      console.log('Starting Request', JSON.stringify(request, null, 2))
      return request
    })

    this.api.interceptors.response.use(response => {
      console.log('Response:', JSON.stringify(response, null, 2))
      return response
    })
  }

  setDefaultHeader(header, value) {
    this.api.defaults.headers.common[header] = value;
  }

  setDefaultBaseUrl(url = "") {
    this.api.defaults.baseURL = config.backendUrl + url + "/";
  }

};

export default HTTPService;
