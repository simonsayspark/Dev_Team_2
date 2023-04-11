import axios from 'axios';

const apiEndpoint = '//localhost:8000';

export const addTransaction = (transaction) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/claims`, transaction)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});


export const getTransaction =() => new Promise ((resolve, reject) =>{

    axios.get(`${apiEndpoint}/claims`)
    .then(x => resolve(x.data))
    .catch(x=>{

        alert(x);
        reject(x);
    });

});

