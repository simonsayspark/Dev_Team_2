import axios from 'axios';

const apiEndpoint = '//localhost:8000';

export const addCompany = (company) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/companies`, company)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const getCompanies = () => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/companies`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});