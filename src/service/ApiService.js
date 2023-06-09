import axios from 'axios'

const _baseUrl = 'http://localhost:8000/api/';
// const _baseUrl = 'https://spring-api-production.up.railway.app/api/';

const config = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    }
};

export default class ApiService {
    async getWithToken(url) {
        const response = await axios.get(`${_baseUrl}${url}`, config);
      
        return response.data;
    }
    
    async postWithToken(url, body) {
        return await axios.post(`${_baseUrl}${url}`, body, config);
    }
      
    async putWithToken(url, body) {
        return await axios.put(`${_baseUrl}${url}`, body, config);
    }
      
    async deleteWithToken(url) {
        return await axios.delete(`${_baseUrl}${url}`, config);
    }

    async get(url) {
        const response = await axios.get(`${_baseUrl}${url}`);
      
        return response.data;
    }

    async post(url, body) {
        return await axios.post(`${_baseUrl}${url}`, body);
    }

    async put(url, body) {
        return await axios.put(`${_baseUrl}${url}`, body);
    }

    async delete(url, body) {
        return await axios.delete(`${_baseUrl}${url}`, body);
    }    

    getCustomersSmall() {
        return fetch('demo/data/customers-small.json').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersMedium() {
        return fetch('demo/data/customers-medium.json').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersLarge() {
        return fetch('demo/data/customers-large.json').then(res => res.json())
                .then(d => d.data);
    }

    getCustomersXLarge() {
        return fetch('demo/data/customers-xlarge.json').then(res => res.json())
                .then(d => d.data);
    }

    getCustomers(params) {
        const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : '';
        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then(res => res.json())
    }

    getUsers(params) {
        const queryParams = params ? Object.keys(params).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k])).join('&') : '';
        return fetch('https://jsonplaceholder.typicode.com/users?' + queryParams).then(res => res.json())
    }
}