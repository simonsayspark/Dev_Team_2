import axios from 'axios';

const apiEndpoint = '//localhost:8000';

export const addCeo = (ceo) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/ceo`, ceo)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});


export const getCeoByEmail = (email) => new Promise ((resolve, reject) => {
    axios.get(`${apiEndpoint}/ceo?cemail=${email}`)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

