import axios from 'axios';

const apiEndpoint = '//localhost:8000';

export const addEmployee = (employee) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/employees`, employee)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});