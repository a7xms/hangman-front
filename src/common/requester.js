import axios from "axios";


export const BASE_URL = "https://rocky-sea-96551-7722b3bce7ce.herokuapp.com/api";


axios.defaults.responseType = "json";
axios.defaults.timeout = 30000;

async function request(method, url, data, params) {
    const token = localStorage.getItem('token');
    data = data || {};
    let headers = {"Content-Type": "application/json", 'Access-Control-Allow-Origin': '*'};
    if (token) {
        headers["Authorization"] = "Bearer " + token;
    }

    try {
        return await axios.request({method, url, data, params, headers});
    } catch (error) {
        if(error.response) {
            if(error.response.status === 401) {
                window.location.href = "/signin";
            }
        }
        return Promise.reject(error);
    }
}

const requester = {
    get: function (url, params = null) {
        return request("get", BASE_URL + url, null, params);
    },
    post: function (url, data = null) {
        return request("post", BASE_URL + url, data, null);
    },
    put: function (url, data = null, params = null) {
        return request("put", BASE_URL + url, data, params);
    },
    delete: function (url, params) {
        return request("delete", BASE_URL + url, null, params);
    }
};

export default requester;
