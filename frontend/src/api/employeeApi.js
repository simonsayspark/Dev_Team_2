import axios from 'axios';

const apiEndpoint = '//localhost:8000';

export const addEmployee = (employee) => new Promise((resolve, reject) => {
    axios.post(`${apiEndpoint}/employees`, employee)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getEmployeeByEmail = (email) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/employees?eemail=${email}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getEmployeeByCompId = (company_id) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/employees?company_id=${company_id}`)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
})

export const removeEmployee = (employee_id) => new Promise((resolve, reject) => {
    axios.delete(`${apiEndpoint}/employees?employee_id=${employee_id}`)
    .then(x => resolve(x.data)).catch(x => {
        alert(x);
        reject(x);
    })
})