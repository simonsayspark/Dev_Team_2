import axios from 'axios';

const apiEndpoint = '//localhost:8000';

export const addCriminal = (criminal) => new Promise ((resolve, reject) => {
    axios.post(`${apiEndpoint}/criminals`, criminal)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
}); 


export const getCriminalById =() => new Promise ((resolve, reject) =>{

    axios.get(`${apiEndpoint}/criminals`)
    .then(x => resolve(x.data))
    .catch(x=>{

        alert(x);
        reject(x);
    });

});

export const getCriminalByStatus =(criminal_id, status) => new Promise ((resolve, reject) =>{

    axios.get(`${apiEndpoint}/criminals?criminal_id=${criminal_id}&criminal_status=${status}`)
    .then(x => resolve(x.data))
    .catch(x=>{

        alert(x);
        reject(x);
    });
});

export const getSortCriminalByStatus =(criminal_id, status, sortBy) => new Promise ((resolve, reject) =>{

    axios.get(`${apiEndpoint}/criminals?criminal_id=${criminal_id}&criminal_status=${status}&sortBy=${sortBy}`)
    .then(x => resolve(x.data))
    .catch(x=>{

        alert(x);
        reject(x);
    });
});




